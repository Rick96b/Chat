import { makeAutoObservable } from "mobx"
import { getCurrentDialog, addMessage, changeLastChatMessage, readCurrentMessage, AddPinnedDialog } from "firebaseCore/controllers";
import addUnreadCount from "firebaseCore/controllers/addUnreadCount";
import { addChatToChatsRelations, addChatToDatabase, addUserToUsersRelations, getChatsRelations, getUserDataByUid, getUserDialogs  } from "firebaseControllers/firestoreControllers";
import { listenForUserChatsRelations, listenForUserDialogs } from "firebaseControllers/firestoreListeners";

class Dialogs {
    currentDialog = {};
    activeChannel = 'General';
    dialogs = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async initializeStore(user) {
        this.setDialogs(await this.getUserDialogs(user));
        listenForUserDialogs(user.uid, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    this.addDialogToDialogs(user.uid, change.doc.data())
                }
                if (change.type === "modified") {
                    this.removeDialogFromDialogs(change.doc.data())
                    this.addDialogToDialogs(user.uid, change.doc.data())
                }
                if (change.type === "removed") {
                    this.removeDialogFromDialogs(user.uid, change.doc.data())
                }
            })
        })
    }

    async getUserDialogs(user) {
        const dialogsDocs = await getUserDialogs(user);
        const dialogsWithRelatedData = dialogsDocs.docs.map(async (dialog) => {
            const relatedData = await getChatsRelations(user.uid, dialog.id);
            return {...dialog.data(), ...relatedData}
        })
        return await Promise.all(dialogsWithRelatedData)
    }

    async addDialogToDialogs(userUid, dialogToAdd) {
        if(!this.dialogs.filter(dialog => dialog.id == dialogToAdd.id)[0]) {
            const relatedData = await getChatsRelations(userUid, dialogToAdd.id);
            this.pushDialog({...relatedData, ...dialogToAdd}) 
        }
    }

    removeDialogFromDialogs(dialogToRemove) {
        this.setDialogs(this.dialogs.filter(dialog => dialog.id != dialogToRemove.id))
    }
    
    pinDialog(dialogId) {
        AddPinnedDialog(this.rootStore.usersStore.currentUser.uid, dialogId)
    }


    async postMessage(message) {
        const unreadedPromises = this.currentDialog.partners.map(async partnerRef => {
            const partner = await getUserDataByUid({userRef: partnerRef})
            if(partner.uid != this.rootStore.usersStore.currentUser.uid) {
                return partner.uid
            }
        })
        Promise.all(unreadedPromises).then(unreadedData => {
            let readData = {};
            unreadedData.forEach(unreadItem => {
                if(unreadItem) {
                    readData[unreadItem] = false
                }
            })
            addMessage(this.currentDialog.id, this.activeChannel, {readed: readData, ...message})
            this.changeUnreadCount()
            if(!this.currentDialog.isGroup) {
                changeLastChatMessage(this.currentDialog.id, {...message})
            };
        })
    }

    async setCurrentDialog(dialogId) {
        await getCurrentDialog(dialogId).then(dialog => {
            let partnersPromises = dialog.partners.map(partnerRef => {
                return getUserDataByUid({userRef: partnerRef})
            })
            Promise.all(partnersPromises)
            .then(partnersData => this.currentDialog = {partnersData: partnersData, ...dialog})
        })
    }

    readMessage(message) {
        readCurrentMessage(this.currentDialog.id, this.activeChannel, message.id, this.rootStore.usersStore.currentUser.uid)
        if(message.author != this.rootStore.usersStore.currentUser.uid) {
            addUnreadCount(this.currentDialog.id, this.rootStore.usersStore.currentUser.uid, -1)
        }
    }

    changeUnreadCount() {
        this.currentDialog.partners.forEach(partner => {
            getUserDataByUid({userRef: partner}).then(user => {
                if(user.uid !== this.rootStore.usersStore.currentUser.uid) {
                    addUnreadCount(this.currentDialog.id, user.uid, 1)
                }
            })
        })
    }

    createNewChat(chat, authorizedUserUid, partnerUid) {
        addChatToDatabase(chat).then(dialogRef => {
            addChatToChatsRelations(authorizedUserUid, dialogRef.id)
            addChatToChatsRelations(partnerUid, dialogRef.id)
            addUserToUsersRelations(partnerUid , authorizedUserUid)
            addUserToUsersRelations(authorizedUserUid, partnerUid)
        })

    }

    setActiveChannel(channelId) {
        this.activeChannel = channelId;
    }

    setDialogs(dialogs) {
        this.dialogs = dialogs;
    }

    pushDialog(dialog) {
        this.dialogs.push(dialog);
    }
}

export default Dialogs;

