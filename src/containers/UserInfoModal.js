import React from 'react';
import { observer } from 'mobx-react';

import {default as BasePage} from 'components/UserInfoModal';
import { RootStore } from 'store';


const UserInformationPage = () => {
    const authorizedUserData = RootStore.usersStore.allUsers.filter(
        user => user.uid == RootStore.usersStore.currentUser.uid
    )[0]
    
    return (
        <BasePage user={authorizedUserData}/>
    );
};

export default UserInformationPage;