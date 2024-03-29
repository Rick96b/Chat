import {makeAutoObservable} from 'mobx';

import { listenForDialogChannelMessages } from 'firebaseControllers/firestoreListeners';
import { addMessageToChannel, changeChatUnreads, changeMessageReadedData, changeLastChatMessage } from 'firebaseControllers/firestoreControllers';

class Dialog {
    messages = {General: []};
    currentDialog = {};
    currentChannel = 'General';

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async initializeStore(dialogId) {
        this.setCurrentDialog(this.rootStore.dialogsStore.dialogs.find(dialog => dialog.id == dialogId));
        this.currentDialog.channels.forEach(channel => {
            listenForDialogChannelMessages(dialogId, channel, (snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        this.addMessageToMessages(channel, change.doc)
                    }
                    if(change.type === 'modified') {
                        this.modifyMessageInMessages(channel, change.doc.data())
                    }
                    if (change.type === "removed") {
                        this.removeMessageFromMessages(channel, change.doc.data())
                    }
                })
            })
        }) 
    }

    addMessageToMessages(channelId, messageToAdd) {
        if(!this.messages[channelId].length || !this.messages[channelId].filter(message => message.id == messageToAdd.id)[0]) {
            this.pushMessage(channelId, messageToAdd.data()) 
        }
    }

    modifyMessageInMessages(channelId, messageToModify) {
        this.setMessages(channelId, this.messages[channelId].map(message => {
            if(message.id == messageToModify.id) {
                return messageToModify
            }
            return message
        }))
    }

    removeMessageFromMessages(channelId, messageToRemove) {
        this.setMessages(channelId, this.messages[channelId].filter(message => message.id != messageToRemove.id))
    }

    pushMessage(channelId, message) {
        this.messages[channelId].push(message)
    }

    postMessage(message) {
        const unreadedData = {};
        this.currentDialog.partners.forEach(partnerUid => {
            if(partnerUid != this.rootStore.usersStore.currentUser.uid) {
                return unreadedData[partnerUid] = false;
            }
            return unreadedData[partnerUid] =  true;
        })
        addMessageToChannel(this.currentDialog.id, this.currentChannel, {readed: unreadedData, ...message})
        this.changeUnreadCount()
        if(!this.currentDialog.isGroup) {
            changeLastChatMessage(this.currentDialog.id, {...message})
        };
    }

    changeUnreadCount() {
        this.currentDialog.partners.forEach(partnerUid => {
            if(partnerUid !== this.rootStore.usersStore.currentUser.uid) {
                changeChatUnreads(this.currentDialog.id, partnerUid, 1)
            }
        })
    }

    readMessage(message) {
        changeMessageReadedData(this.currentDialog.id, this.currentChannel, message.id, this.rootStore.usersStore.currentUser.uid)
        changeChatUnreads(this.currentDialog.id, this.rootStore.usersStore.currentUser.uid, -1)
    }

    setCurrentDialog(dialog) {
        this.currentDialog = dialog;
    }

    setMessages(channelId, messages) {
        this.messages[channelId] = messages;
    }

    setInitialized() {
        this.initialized = true;
    }
}

export default Dialog;