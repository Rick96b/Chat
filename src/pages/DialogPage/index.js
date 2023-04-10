import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import {useCollectionData} from 'react-firebase-hooks/firestore'

import {default as BasePage} from './DialogPage';
import { RootStore } from 'store';
import { db } from 'firebaseCore';
import { collection, orderBy, query } from 'firebase/firestore';

const DialogPage = () => {
    let dialogId = useParams().dialogId;
    const messages = RootStore.dialogStore.messages[RootStore.dialogStore.currentChannel] ?
        RootStore.dialogStore.messages[RootStore.dialogStore.currentChannel] : [];

    if(!RootStore.dialogStore.initialized) {
        RootStore.dialogStore.initializeStore(dialogId);
    } else {
        return <BasePage messages={messages}/>
    }

};

export default observer(DialogPage);