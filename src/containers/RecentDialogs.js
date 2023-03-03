import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { observer } from 'mobx-react-lite';

import { RecentDialogs as BaseDialogs } from 'components';
import { DialogsStore } from 'store';

const RecentDialogs = () => {
    const [dialogs, setDialogs] = useState([])

    useEffect(() => {
        if(!dialogs.length) {
            DialogsStore.fetchAllDialogs(result => setDialogs(result));
        }
        else {
            setDialogs(DialogsStore.dialogs)
        }
    }, [DialogsStore.dialogs])

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
            dialogs={dialogs}
            ref={refPassthrough}
            {...SwipeHandlers}
        />
    );
};

export default observer(RecentDialogs);