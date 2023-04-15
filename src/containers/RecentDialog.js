import React, { createRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { observer } from 'mobx-react';

import { RootStore } from 'store';
import { RecentDialog as BaseDialog } from 'components';


const RecentDialog = ({dialog}) => {
    const dialogRef = createRef();
    let partnerData;
    if(!dialog.isGroup) {
        const partnerUid = dialog.partners.filter(partner => partner !== RootStore.usersStore.currentUser.uid)[0]
        partnerData = RootStore.usersStore.allUsers.filter(user => user.uid === partnerUid)[0]
    }

    const SwipeHandlers = useSwipeable({ 
        onSwipedLeft: 
        ({ event }) => {
            event.currentTarget.style.transform = `translate3d(-128px, 0, 0)`;
        },         
        onSwipedRight:  
        ({ event }) => {
            event.currentTarget.style.transform = `translate3d(0, 0, 0)`;
        },
        preventScrollOnSwipe: true,
    })

    const refPassthrough = (el) => {
        SwipeHandlers.ref(el);
        dialogRef.current = el;
    }

    const pinButtonClick = () => {
        if(dialog.isPinned) RootStore.dialogsStore.unpinDialog(dialog.id)
        else RootStore.dialogsStore.pinDialog(dialog.id)   
        dialogRef.current.style.transform = `translate3d(0, 0, 0)`;
    }

    const deleteButtonClick = () => {
        RootStore.dialogsStore.deleteChat(dialog, partnerData.uid)   
        dialogRef.current.style.transform = `translate3d(0, 0, 0)`;
    }
    
    return (
        <BaseDialog
            name={partnerData.login}
            lastMessage={dialog.lastMessage}
            unreadCount={dialog.unreads}
            precenseData={partnerData.precenseData}
            avatar={partnerData.avatar}
            dialogId={dialog.id}
            onPinButtonClick={pinButtonClick}
            onDeleteButtonClick={deleteButtonClick}
            isPinned={dialog.isPinned}
            ref={refPassthrough}
        />
    );
};

export default observer(RecentDialog);