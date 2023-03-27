import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { RecentDialogs as BaseDialogs } from 'components';
import { RootStore } from 'store';
import { observer } from 'mobx-react-lite';

const RecentDialogs = () => {

    const SwipeHandlers = useSwipeable({ 
        onSwipedUp: 
        ({ event }) => {
            event.currentTarget.parentNode.style.transform = `translate3d(0, 0, 0)`;
            event.currentTarget.parentNode.style.height = null;
        },         
        onSwipedDown:  
        ({ event }) => {
            event.currentTarget.parentNode.style.transform = `translate3d(0, 292px, 0)`;
            event.currentTarget.parentNode.style.height = `${event.currentTarget.parentNode.offsetHeight - 292}px`;
        },
        preventScrollOnSwipe: true,
    })

    const refPassthrough = (el) => {
        SwipeHandlers.ref(el);
    }
    
    
    return (
        <BaseDialogs
            dialogs={RootStore.dialogsStore.dialogs}
            ref={refPassthrough}
            {...SwipeHandlers}
        />
    );
};

export default observer(RecentDialogs);