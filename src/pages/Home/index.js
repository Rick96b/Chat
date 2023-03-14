import { collection, doc, query, where } from 'firebase/firestore';
import React from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';

import {default as BasePage} from './HomePage';
import { auth, db } from 'firebaseCore';
import { DialogsStore } from 'store';
import { DialogPrepocesser } from 'utils';
import { UsersStore } from 'store';

const HomePage = () => {
    const [userData, userDataLoading] = useDocumentData(
        query(doc(db, 'users', auth.currentUser.uid))
    );



    if(userData) {
        UsersStore.setCurrentUser(userData)      
        if(!DialogsStore.initialized) {
            DialogsStore.initializeStore(userData);
        }
    }

    return (
        <BasePage />
    );
};

export {HomePage};