import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import {default as BasePage} from './HomePage';
import { Loader } from 'components';
import { RootStore } from 'store';
import { getUserDataByUid } from 'firebaseControllers/firestoreControllers';
import { presenceHandler } from 'firebaseControllers/realtimeDatabaseControllers';



const HomePage = ({user}) => {
    const [initializingDialogs, setInitializingDialogs] = useState(true);

    if(RootStore.initialized == false && initializingDialogs == true) {
        getUserDataByUid(user.uid).then(async userData => {
            presenceHandler(userData.uid);
            await RootStore.initializeStores(userData);
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

export default observer(HomePage);