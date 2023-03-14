import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {useCollectionData} from 'react-firebase-hooks/firestore'

import {default as BasePage} from './DialogPage';
import { DialogsStore } from 'store';
import { db } from 'firebaseCore';
import { collection, orderBy, query } from 'firebase/firestore';

const DialogPage = () => {
    let dialogId = useParams().dialogId;
    const [messages, loading] = useCollectionData(
        query(collection(db, 'dialogs', dialogId, 'channels', DialogsStore.activeChannel, 'messages'), orderBy('createdAt'))
    );

    if(DialogsStore.currentDialog.id !== dialogId) {
        DialogsStore.setCurrentDialog(dialogId)
    } else {
        return <BasePage messages={messages}/>
    }

};

export default observer(DialogPage);