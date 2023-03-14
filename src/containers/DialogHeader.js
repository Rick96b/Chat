import React from 'react';
import { DialogHeader as BaseDialogHeader } from 'components';
import { observer } from 'mobx-react';
import { DialogsStore } from 'store';
import { getCurrentUser } from 'firebaseCore/controllers';
import { UsersStore } from 'store';

const DialogHeader = () => {
    let dialogName = '';
    let onlineData = '';

    dialogName = DialogsStore.currentDialog.partnersData.filter(partner => partner.uid != UsersStore.currentUser.uid)[0].login

    return (
        <BaseDialogHeader dialogName={dialogName}/>
    );
};

export default observer(DialogHeader);