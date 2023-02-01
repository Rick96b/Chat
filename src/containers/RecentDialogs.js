import React, { useState } from 'react';
import {RecentDialogs as BaseDialogs} from 'components';
import { observer } from 'mobx-react-lite';
import dialogsStore from 'store/dialogsStore';

const RecentDialogs = observer(({dialogs}) => {

    const changeActiveGroup = (newGroup) => {
        dialogsStore.setActiveGroup(newGroup);
    }
    
    return (
        <BaseDialogs
            dialogs={dialogs}
            activeGroup={dialogsStore.activeGroup}
            changeActiveGroup={changeActiveGroup}
        />
    );
});

export default RecentDialogs;