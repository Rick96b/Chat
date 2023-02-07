import React from 'react';
import {RecentDialogs as BaseDialogs} from 'components';
import { observer } from 'mobx-react-lite';
import dialogsStore from 'store/dialogsStore';
import { useSwipeable } from 'react-swipeable';

const RecentDialogs = observer(({dialogs}) => {

    const SwipeHandlers = useSwipeable({ 
        onSwipedUp: 
        ({ event }) => {
            event.currentTarget.parentNode.style.transform = `translate3d(0, 0, 0)`;
            event.currentTarget.parentNode.style.height = null;
        },         
        onSwipedDown:  
        ({ event }) => {
            console.log(event.currentTarget.parentNode.offsetHeight)
            event.currentTarget.parentNode.style.transform = `translate3d(0, 292px, 0)`;
            event.currentTarget.parentNode.style.height = `${event.currentTarget.parentNode.offsetHeight - 292}px`;
        },
        preventScrollOnSwipe: true,
    })

    const refPassthrough = (el) => {
        SwipeHandlers.ref(el);
    }

    const changeActiveGroup = (newGroup) => {
        dialogsStore.setActiveGroup(newGroup);
    }
    
    return (
        <BaseDialogs
            dialogs={dialogs}
            activeGroup={dialogsStore.activeGroup}
            changeActiveGroup={changeActiveGroup}
            ref={refPassthrough}
            {...SwipeHandlers}
        />
    );
});

export default RecentDialogs;