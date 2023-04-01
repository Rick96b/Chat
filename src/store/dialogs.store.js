import { makeAutoObservable, reaction } from "mobx"
import { getCurrentDialog, addMessage, changeLastChatMessage, getCurrentUser, readCurrentMessage, addChatToDatabase, getUserDialogs, listenForUsersStatuses, AddPinnedDialog, getPinnedDialogs, addChatToRelations } from "firebaseCore/controllers";
import addUnreadCount from "firebaseCore/controllers/addUnreadCount";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseCore";
import { DialogPrepocesser } from "utils";

class Dialogs {
    initialized = false;
    currentDialog = {};
    activeChannel = 'General';
    dialogs = [];
    pinnedDialogs = [];
    d = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);

        const usersStatusUpdated = reaction(
            () => this.rootStore.usersStore.usersStatus,
            async () => this.setDialogs(await this.getUserDialogs(this.rootStore.usersStore.currentUser))
        )
    }

    async initializeStore(user) {
        this.initialized = true;
        this.dialogs = await this.getUserDialogs(user);
        onSnapshot(query(collection(db, 'dialogs'), 
            where('partners', 'array-contains', doc(db, 'users', user.uid))), async () => {
            this.dialogs = await this.getUserDialogs(user)
        });
        onSnapshot(query(collection(db, 'usersDialogsRelations', user.uid, 'dialogs'), 
            where('isPinned', '==', true)), async () => {
            this.pinnedDialogs = await this.getPinnedDialogs(user)
        });
    }

    pinDialog(dialogId) {
        AddPinnedDialog(this.rootStore.usersStore.currentUser.uid, dialogId)
    }

    async getUserDialogs(user) {
        const dialogsDocs = await getUserDialogs(user);
        const userDialogs = dialogsDocs.docs.map(dialog => {
            return {...dialog.data(), id:dialog.id}
        })
        return await DialogPrepocesser({
            dialogsData: userDialogs, 
            authUser: user, 
            onlineUsers: this.rootStore.usersStore.usersStatus
        })
    }

    async getPinnedDialogs(user) {
        const pinnedDialogsDocs = await getPinnedDialogs(user);
        const pinnedUserDialogs = pinnedDialogsDocs.map(dialog => {
            return {...dialog, id:dialog.id}
        })
        return await DialogPrepocesser({
            dialogsData: pinnedUserDialogs, 
            authUser: user, 
            onlineUsers: this.rootStore.usersStore.usersStatus
        })
    }

    async postMessage(message) {
        const unreadedPromises = this.currentDialog.partners.map(async partnerRef => {
            const partner = await getCurrentUser({userRef: partnerRef})
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
                return getCurrentUser({userRef: partnerRef})
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
            getCurrentUser({userRef: partner}).then(user => {
                if(user.uid !== this.rootStore.usersStore.currentUser.uid) {
                    addUnreadCount(this.currentDialog.id, user.uid, 1)
                }
            })
        })
    }

    createNewChat(chat, authorizedUserUid, partnerUid) {
        addChatToDatabase(chat).then(dialogRef => {
            addChatToRelations(authorizedUserUid, dialogRef.id)
            addChatToRelations(partnerUid, dialogRef.id)
        })

    }

    setActiveChannel(channelId) {
        this.activeChannel = channelId;
    }

    setDialogs(dialogs) {
        this.dialogs = dialogs;
    }
}

export default Dialogs;
