import { makeObservable, runInAction, action, observable } from "mobx"
import { getCurrentDialog, addMessage, changeLastChatMessage } from "firebaseCore/controllers";

class Dialogs {
    currentDialog = {};
    activeChannel = 'General';
    dialogs = []

    constructor() {
        makeObservable(this, {
            currentDialog: observable,
            activeChannel: observable,
            dialogs: observable,
            setDialogs: action,
            setCurrentDialog: action,
            setActiveChannel: action,
            postMessage: action
        });
    }

    async postMessage(message) {
        addMessage(this.currentDialog.id, this.activeChannel, message)
        if(!this.currentDialog.isGroup) {
            changeLastChatMessage(this.currentDialog.id, message)
        }
    }

    async setCurrentDialog(dialogId) {
        runInAction(() => {
            getCurrentDialog(dialogId).then(dialog => this.currentDialog = dialog)
        })  
    }

    setActiveChannel(channelId) {
        this.activeChannel = channelId;
    }

    setDialogs(dialogs) {
        this.dialogs = dialogs
    }
}

export default new Dialogs();

