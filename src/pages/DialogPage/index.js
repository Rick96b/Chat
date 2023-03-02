import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {reaction} from 'mobx'

import {default as BasePage} from './DialogPage';
import { DialogsStore } from 'store';

const DialogPage = observer(() => {
    let dialogId = useParams().dialogId;
    let messages = [];

    useEffect(() => {
        if(!DialogsStore.messagesList[dialogId]) {
            DialogsStore.fetchDialogWithMessages(dialogId);
        }
    })

    
    reaction(
        () => DialogsStore.messagesList[dialogId],
        messagesList => console.log(messagesList)
    )

    if(DialogsStore.messagesList[dialogId] ) {
        messages=DialogsStore.messagesList[dialogId][DialogsStore.activeChannel]
    }


    return (
        <BasePage messages={messages} />
    );
});

export  {DialogPage};