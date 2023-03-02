import { makeObservable, runInAction, action, observable } from "mobx"
import { getAllDialogs, getCurrentDialog, getMessages, addMessage } from "firebaseCore/controllers";

class Dialogs {
    dialogs = [];
    currentDialog = {};
    messagesList = {};
    activeChannel = 'General';

    constructor() {
        makeObservable(this, {
            dialogs: observable,
            currentDialog: observable,
            messagesList: observable,
            activeChannel: observable,
            postMessage: action,
            fetchAllDialogs: action,
            fetchDialogWithMessages: action,
            fetchMessages: action,
            setCurrentDialog: action,
            fetchCurrentDialog: action,
            fetchChannelMessages: action,
            setCurrentChannel: action,
        });
    }
    

    postMessage(message) {
        addMessage(this.currentDialog.id, this.activeChannel, message)
        this.messagesList[this.currentDialog.id][this.activeChannel].push(message)
    } 

    async fetchAllDialogs(callback) {
        await getAllDialogs().then(result => {
            runInAction(() => {
                this.dialogs = result
            })
            return result
        }).then(result => callback(result));
    }

    async fetchDialogWithMessages(dialogId) {       
        this.setCurrentDialog(dialogId)
        this.fetchMessages(dialogId, this.activeChannel)
    }

    async fetchMessages(dialogId, channel) {
        await getMessages(dialogId, channel).then(result => {
            runInAction(() => {
                this.messagesList[dialogId] = {[channel] : result}
            })
            return result
        }).catch(e => console.log(e.message));
    }   

    setCurrentDialog(dialogId) {
        let currentDialogInFetchedDialogs = this.dialogs.find(dialog => dialog.id === dialogId)
        if (currentDialogInFetchedDialogs) {
            this.currentDialog = {id:dialogId, ...currentDialogInFetchedDialogs}
        } else {
            this.fetchCurrentDialog(dialogId)
        }
    }

    async fetchCurrentDialog(dialogId) {
        await getCurrentDialog(dialogId).then(result => {
            runInAction(() => {
                this.currentDialog = {id:dialogId, ...result}
            })
        });
    }

    async fetchChannelMessages(channelId, callback) {
        this.setCurrentChannel(channelId)
        if(!this.messagesList[this.currentDialog.id][channelId]) {
            this.fetchMessages(this.currentDialog.id, channelId, callback)
        }
    }

    setCurrentChannel(newChannelId) {
        this.activeChannel = newChannelId;
    }
}

export default new Dialogs();

