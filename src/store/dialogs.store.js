import { makeAutoObservable } from "mobx"
import { addChannelToChat, addChatToChatsRelations, removePinnedDialog, addChatToDatabase, getChatsRelations, getUserDialogs, addPinnedDialog, removeChatFromDatabase, removeChatFromChatsRelations, removeChannelFromChat  } from "firebaseControllers/firestoreControllers";
import { listenForUserChatsRelations, listenForUserDialogs } from "firebaseControllers/firestoreListeners";
import { generateUniqueUUID } from "utils";

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
                    this.addDialogToDialogs(user.uid, change.doc)
                }
                if(change.type === 'modified') {
                    this.modifyDialogInDialogs(change.doc.data())
                }
                if (change.type === "removed") {
                    this.removeDialogFromDialogs(change.doc.data())
                }
            })
        })
        listenForUserChatsRelations(user.uid, (snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'modified') {
                    this.addRelatedDataToDialog(change.doc)
                }
                if(change.type === 'added') {
                    this.addRelatedDataToDialog(change.doc)
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
        const dialogToAddId = dialogToAdd.id;
        const dialogToAddData = dialogToAdd.data();
        if(!this.dialogs.filter(dialog => dialog.id == dialogToAddId)[0]) {
            const relatedData = await getChatsRelations(userUid, dialogToAddId);
            this.pushDialog({...relatedData, ...dialogToAddData}) 
        }
    }

    modifyDialogInDialogs(dialogToModify) {
        this.setDialogs(this.dialogs.map(dialog => {
            if(dialog.id == dialogToModify.id) {
                return {...dialog, ...dialogToModify}
            }
            return dialog
        }))
    }

    removeDialogFromDialogs(dialogToRemove) {
        this.setDialogs(this.dialogs.filter(dialog => dialog.id != dialogToRemove.id))
    }

    addRelatedDataToDialog(relatedData) {
        const dialogToModify = this.dialogs.filter(dialog => dialog.id == relatedData.id)[0]
        this.modifyDialogInDialogs({...dialogToModify, ...relatedData.data()})
    }
    
    pinDialog(dialogId) {
        addPinnedDialog(this.rootStore.usersStore.currentUser.uid, dialogId)
    }

    unpinDialog(dialogId) {
        removePinnedDialog(this.rootStore.usersStore.currentUser.uid, dialogId)
    }

    createNewChat(chat, authorizedUserUid, partnerUid) {
        const id = generateUniqueUUID();
        addChatToDatabase(chat, id).then(() => {
            addChannelToChat(id, 'General')
            addChatToChatsRelations(authorizedUserUid, id);
            addChatToChatsRelations(partnerUid, id);
        })     
    }

    deleteChat(chat, partnerUid) {
        chat.channels.forEach(channelId => {
            removeChannelFromChat(chat.id, channelId);
        })
        removeChatFromDatabase(chat.id);
        removeChatFromChatsRelations(partnerUid, chat.id);
        removeChatFromChatsRelations(this.rootStore.usersStore.currentUser.uid, chat.id);
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

