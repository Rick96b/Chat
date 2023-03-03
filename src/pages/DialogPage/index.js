import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {reaction} from 'mobx'

import {default as BasePage} from './DialogPage';
import { DialogsStore } from 'store';

const DialogPage = () => {
    let dialogId = useParams().dialogId;
    let messages;

    useEffect(() => {
        if(!DialogsStore.messagesList[dialogId]) {
            DialogsStore.fetchDialogWithMessages(dialogId);
        }
    })

    if (DialogsStore.messagesList[dialogId]) {
        messages = DialogsStore.messagesList[dialogId][DialogsStore.activeChannel]
    }

    return (
        <BasePage messages={messages} />
    );
};

export default observer(DialogPage);