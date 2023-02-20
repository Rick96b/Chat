import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { DialogsStore } from 'store';
import {default as BasePage} from './DialogPage';


const DialogPage = () => {
    const [messages, setMessages] = useState([])
    let dialogId = useParams().dialogId;
    
    useEffect(() => {
        if(!DialogsStore.messagesList[dialogId]) {
            DialogsStore.fetchDialogWithMessages(dialogId, result => setMessages(result.messagesList));
        }
        else if(!DialogsStore.messagesList[dialogId][DialogsStore.activeChannel]) {
            setMessages([])
        }
        else {
            setMessages(DialogsStore.messagesList[dialogId][DialogsStore.activeChannel]);
        }
    }, [DialogsStore.messagesList[dialogId], DialogsStore.activeChannel])



    return (
        <BasePage messages={messages}/>
    );
};

export default observer(DialogPage);