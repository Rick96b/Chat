import React from 'react';

import { MessagesList as BaseList} from 'components';
import { ChooseCorrectMessageType,  SeparateMessagesOnBlocks } from 'utils';
import { DialogsStore } from 'store';
import { observer } from 'mobx-react';
import { UsersStore } from 'store';

const MessagesList = ({ messages }) => {
    const MessagesReadFunc = (messages) => {
        console.log(messages)
        messages.forEach(message => {
            if(message.props.readed[UsersStore.currentUser.uid] === false) {
                DialogsStore.readMessage(message.props)
            }
        })
    }


    if(messages) {
        let correctMessages = messages.map((message) => 
            ChooseCorrectMessageType(message)
        )

        if (DialogsStore.currentDialog.isGroup) {
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