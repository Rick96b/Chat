import React, { createRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { RootStore } from 'store';

import { RecentDialog as BaseDialog } from 'components';

const RecentDialog = ({dialog}) => {
    const dialogRef = createRef();
    const SwipeHandlers = useSwipeable({ 
        onSwipedLeft: 
        ({ event }) => {
            event.currentTarget.style.transform = `translate3d(-60px, 0, 0)`;
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

    const pinButtonClick = (event) => {
        RootStore.dialogsStore.pinDialog(dialog.dialogId)
        dialogRef.current.style.transform = `translate3d(0, 0, 0)`;
    }

    const members = dialog.partners.filter(member => member.uid != RootStore.usersStore.currentUser.uid)
    console.log(members)
    
    return (
        <BaseDialog
            name={dialog.name}
            lastMessage={dialog.lastMessage}
            unreadCount={dialog.unreadCount}
            isOnline={true}
            dialogId={dialog.dialogId}
            onPinButtonClick={pinButtonClick}
            ref={refPassthrough}
        />
    );
};

export default RecentDialog;