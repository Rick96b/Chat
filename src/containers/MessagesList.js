import React from 'react';

import { MessagesList as BaseList} from 'components';
import { ChooseCorrectMessageType,  SeparateMessagesOnBlocks } from 'utils';
import { observer } from 'mobx-react';
import { RootStore } from 'store';

const MessagesList = ({ messages }) => {
    const MessagesReadFunc = (messages) => {
        messages.forEach(message => {
            if(message.props.readed[RootStore.usersStore.currentUser.uid] === false) {
                console.log(RootStore.usersStore.currentUser.uid)
                RootStore.dialogStore.readMessage(message.props)
            }
        })
    }

    if(messages) {
        let correctMessages = [];
        messages.forEach((message) => {
            const correctMessage = ChooseCorrectMessageType(message, RootStore.usersStore.currentUser.uid);
            if(correctMessage) correctMessages.push(correctMessage);
        })

        if (RootStore.dialogsStore.currentDialog.isGroup) {
            let blocksOfMessages = SeparateMessagesOnBlocks(correctMessages)
            return (
                <BaseList items={blocksOfMessages}  MessagesReadFunc={MessagesReadFunc}/>
            );
        }

        return (
            <BaseList items={correctMessages}  MessagesReadFunc={MessagesReadFunc}/>
        )
    }

    return (
        <BaseList items={[]} MessagesReadFunc={MessagesReadFunc}/>
    )
   
};

export default observer(MessagesList);