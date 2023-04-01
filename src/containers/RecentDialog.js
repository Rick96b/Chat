import React, { createRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { RootStore } from 'store';

import { RecentDialog as BaseDialog } from 'components';



const RecentDialog = (props) => {
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
        RootStore.dialogsStore.pinDialog(props.dialogId)
        dialogRef.current.style.transform = `translate3d(0, 0, 0)`;
    }
    
    return (
        <BaseDialog
            name={props.name}
            lastMessage={props.lastMessage}
            unreadCount={props.unreadCount}
            isOnline={props.isOnline}
            dialogId={props.dialogId}
            onPinButtonClick={pinButtonClick}
            ref={refPassthrough}
        />
    );
};

export default RecentDialog;