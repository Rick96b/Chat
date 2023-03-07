import { doc, query } from 'firebase/firestore';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import {default as BasePage} from './HomePage';
import { getAllDialogs } from 'firebaseCore/controllers';
import { auth, db } from 'firebaseCore';
import { DialogsStore } from 'store';
import { SetDialogNameAndAvatar } from 'utils';

const HomePage = () => {
    const [userData, loading] = useDocumentData(
        query(doc(db, 'users', auth.currentUser.uid))
    );


    if(userData) {
        getAllDialogs(userData.chats).then(dialogsData => SetDialogNameAndAvatar(
            {dialogsData: dialogsData, 
            authUser: userData}))
        .then(newDialogsData => DialogsStore.setDialogs(newDialogsData))
    }

    return (
        <BasePage />
    );
};

export {HomePage};