import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import {default as BasePage} from './DialogPage';
import { RootStore } from 'store';

const DialogPage = () => {
    const [initializeDialog, setInitializeDialog] = useState(false)
    let dialogId = useParams().dialogId;
    const messages = RootStore.dialogStore.messages[RootStore.dialogStore.currentChannel] ?
        RootStore.dialogStore.messages[RootStore.dialogStore.currentChannel] : [];


    if(!RootStore.dialogStore.currentDialog ||
        RootStore.dialogStore.currentDialog && 
        RootStore.dialogStore.currentDialog.id !== dialogId
        ) 
    {
        setInitializeDialog(true)
        RootStore.dialogStore.initializeStore(dialogId).then(() => setInitializeDialog(false));
    } else if (!initializeDialog)
    {
        return <BasePage messages={messages}/>
    }

};

export default observer(DialogPage);