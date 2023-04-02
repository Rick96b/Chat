import React, { useState } from 'react';

import {default as BasePage} from './HomePage';
import { Loader } from 'components';
import { RootStore } from 'store';
import { getUserDataByUid } from 'firebaseControllers/firestoreControllers';
import { presenceHandler } from 'firebaseControllers/realtimeDatabaseControllers';


const HomePage = ({user}) => {
    const [initializingDialogs, setInitializingDialogs] = useState(true);

    if(user && initializingDialogs) {
        getUserDataByUid(user.uid).then(async userData => {
            presenceHandler(user.uid);
            await RootStore.dialogsStore.initializeStore(userData);
            RootStore.usersStore.initializeStore(userData);
            setInitializingDialogs(false);
        })

        return (
            <Loader />
        )
    }

    return (
        <BasePage />
    );
};

export {HomePage};