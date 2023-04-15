import React from 'react';
import { DialogHeader as BaseDialogHeader } from 'components';
import { observer } from 'mobx-react';
import { RootStore } from 'store';

const DialogHeader = () => {
    const partnerUid = RootStore.dialogStore.currentDialog.partners.filter(partnerUid => partnerUid != RootStore.usersStore.currentUser.uid)[0];
    const partnerData = RootStore.usersStore.allUsers.filter(user => user.uid == partnerUid)[0];

    return (
        <BaseDialogHeader 
            dialogName={partnerData.login} 
            onlineData={partnerData.precenseData}
            avatar={partnerData.avatar}
        />
    );
};

export default observer(DialogHeader);