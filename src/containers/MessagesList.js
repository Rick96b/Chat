import React from 'react';

import { MessagesList as BaseList} from 'components';
import { ChooseCorrectMessageType,  SeparateMessagesOnBlocks } from 'utils';
import { DialogsStore } from 'store';

const MessagesList = ({ messages }) => {
    
    if(messages) {
        let correctMessages = messages.map((message) => 
            ChooseCorrectMessageType(message)
        )

        if (DialogsStore.currentDialog.isGroup) {
            let blocksOfMessages = SeparateMessagesOnBlocks(correctMessages)
            return (
                <BaseList items={blocksOfMessages} />
            );
        }

        return (
            <BaseList items={correctMessages} />
        )
    }

    return (
        <BaseList items={messages} />
    )
   
};

export default MessagesList;