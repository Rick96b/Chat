import { doc, query } from 'firebase/firestore';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import {default as BasePage} from './HomePage';
import { getAllDialogs } from 'firebaseCore/controllers';
import { auth, db } from 'firebaseCore';
import { DialogsStore } from 'store';

const HomePage = () => {
    const [userDoc, loading] = useDocumentData(
        query(doc(db, 'users', auth.currentUser.uid))
    );

    if(userDoc) {
        getAllDialogs(userDoc.chats).then(dialogsData => DialogsStore.setDialogs(dialogsData))
    }

    return (
        <BasePage />
    );
};

export {HomePage};