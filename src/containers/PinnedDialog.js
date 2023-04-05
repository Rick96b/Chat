import React from 'react';

import {PinnedDialog as BaseDialog} from 'components';
import { RootStore } from 'store';

const PinnedDialog = ({ dialog }) => {
    let partner;
    if(!dialog.isGroup) {
        partner = RootStore.usersStore.allUsers.filter(user => user.uid == dialog.partner)[0]
    }


    return (
        <BaseDialog 
            name={partner.login}
            avatar={partner.avatar}
            lastMessage={dialog.lastMessage}
            precenseData={partner.precenseData}
            isUnreadMessages={dialog.unread > 0 ? true : false}
        />
    );
};

export default PinnedDialog;