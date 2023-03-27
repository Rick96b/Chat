import React from 'react';

import { MessagesList as BaseList} from 'components';
import { ChooseCorrectMessageType,  SeparateMessagesOnBlocks } from 'utils';
import { observer } from 'mobx-react';
import { RootStore } from 'store';

const MessagesList = ({ messages }) => {
    const MessagesReadFunc = (messages) => {
        console.log(messages)
        messages.forEach(message => {
            if(message.props.readed[RootStore.usersStore.currentUser.uid] === false) {
                RootStore.dialogsStore.readMessage(message.props)
            }
        })
    }


    if(messages) {
        let correctMessages = messages.map((message) => 
            ChooseCorrectMessageType(message)
        )

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