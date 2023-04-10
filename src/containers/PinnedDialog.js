import React from 'react';

import {PinnedDialog as BaseDialog} from 'components';
import { RootStore } from 'store';
import { observer } from 'mobx-react-lite';

const PinnedDialog = ({ dialog }) => {
    let partnerData;
    if(!dialog.isGroup) {
        const partnerUid = dialog.partners.filter(partner => partner != RootStore.usersStore.currentUser.uid)[0]
        partnerData = RootStore.usersStore.allUsers.filter(user => user.uid == partnerUid)[0]
    }

    return (
        <BaseDialog 
            name={partnerData.login}
            avatar={partnerData.avatar}
            lastMessage={dialog.lastMessage}
            precenseData={partnerData.precenseData}
            isUnreadMessages={dialog.unread > 0 ? true : false}
        />
    );
};

export default observer(PinnedDialog);