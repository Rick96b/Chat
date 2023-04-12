import React from 'react';

import {default as BasePage} from './UserInformationPage';
import { RootStore } from 'store';

const UserInformationPage = ({authorizedUser}) => {
    const authorizedUserData = RootStore.usersStore.allUsers.filter(user => user.uid == authorizedUser.uid)[0]
    
    return (
        <BasePage user={authorizedUserData}/>
    );
};

export default UserInformationPage;