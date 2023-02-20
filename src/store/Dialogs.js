import { makeObservable, observable, action, runInAction } from "mobx"
import { dialogsApi } from "axiosCore/api";

class Dialogs {
    dialogs = [];
    currentDialog = {};
    messagesList = {};
    activeChannel = 'General';

    constructor() {
        makeObservable(this, {
            dialogs: observable,
            currentDialog: observable,
            activeChannel: observable,
            fetchAllDialogs: action,
            fetchDialogWithMessages: action,
            setCurrentDialog: action,
            setCurrentChannel: action,
        });
    }

    async fetchAllDialogs() {
        await dialogsApi.getAllDialogs().then(result => {
            runInAction(() => {
                this.dialogs = result.data
            })
        });
    }

    async fetchDialogWithMessages(dialogId, callback) {       
        this.setCurrentDialog(dialogId)
        this.fetchMessages(dialogId, this.activeChannel, callback)
    }

    async fetchMessages(dialogId, channel, callback) {
        await dialogsApi.getMessages(dialogId, channel).then(result => {
            runInAction(() => {
                this.messagesList[dialogId] = {[channel] : result.data.messagesList}
            })
            return result.data
        }).then(result => callback(result)).catch(e => console.log(e.message));
    }   

    setCurrentDialog(dialogId) {
        let currentDialogInFetchedDialogs = this.dialogs.find(dialog => dialog.id === dialogId)
        if (currentDialogInFetchedDialogs) {
            this.currentDialog = currentDialogInFetchedDialogs
        } else {
            this.fetchCurrentDialog(dialogId)
        }
    }

    async fetchCurrentDialog(dialogId) {
        await dialogsApi.getCurrentDialog(dialogId).then(result => {
            runInAction(() => {
                this.currentDialog = result.data
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