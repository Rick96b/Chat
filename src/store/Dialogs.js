import { makeObservable, action, observable } from "mobx"
import { getCurrentDialog, addMessage, changeLastChatMessage, getCurrentUser, readCurrentMessage, addChatToDatabase, getUserDialogs } from "firebaseCore/controllers";
import addUnreadCount from "firebaseCore/controllers/addUnreadCount";
import { UsersStore } from "store";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseCore";
import { DialogPrepocesser } from "utils";

class Dialogs {
    initialized = false;
    currentDialog = {};
    activeChannel = 'General';
    dialogs = []
    d = {};

    constructor() {
        makeObservable(this, {
            initialized: observable,
            currentDialog: observable,
            activeChannel: observable,
            dialogs: observable,
            setDialogs: action,
            setCurrentDialog: action,
            setActiveChannel: action,
            postMessage: action,
            initializeStore: action,
        });
    }

    async initializeStore(user) {
        this.initialized = true;
        const dialogsDocs = await getUserDialogs(user);
        this.dialogs = await this.getUserDialogs(user, dialogsDocs);
        onSnapshot(query(collection(db, 'dialogs'), 
            where('partners', 'array-contains', doc(db, 'users', user.uid))), async (dialogsDocs) => {
            this.dialogs = await this.getUserDialogs(user, dialogsDocs)
        });
    }

    async getUserDialogs(user, dialogsDocs) {
        let userDialogs = dialogsDocs.docs.map(dialog => {
            return {...dialog.data(), id:dialog.id}
        })
        return await DialogPrepocesser({dialogsData: userDialogs, authUser: user})
    }

    async postMessage(message) {
        const unreadedPromises = this.currentDialog.partners.map(async partnerRef => {
            const partner = await getCurrentUser({userRef: partnerRef})
            if(partner.uid != UsersStore.currentUser.uid) {
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
        readCurrentMessage(this.currentDialog.id, this.activeChannel, message.id, UsersStore.currentUser.uid)
        if(message.author != UsersStore.currentUser.uid) {
            addUnreadCount(this.currentDialog.id, UsersStore.currentUser.uid, -1)
        }
    }

    changeUnreadCount() {
        this.currentDialog.partners.forEach(partner => {
            getCurrentUser({userRef: partner}).then(user => {
                if(user.uid !== UsersStore.currentUser.uid) {
                    addUnreadCount(this.currentDialog.id, user.uid, 1)
                }
            })
        })
    }

    createNewChat(chat) {
        addChatToDatabase(chat)
    }

    setActiveChannel(channelId) {
        this.activeChannel = channelId;
    }

    setDialogs(dialogs) {
        this.dialogs = dialogs;
    }
}

export default new Dialogs();

