import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { observer } from 'mobx-react-lite';

import {PinnedDialogs as BaseDialogs} from 'components';
import { DialogsStore } from 'store';

const PinnedDialogs = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [dialogs, setDialogs] = useState([])

    useEffect(() => {
        if(!dialogs.length) {
            DialogsStore.fetchAllDialogs();
        }
        if(DialogsStore.dialogs) {
            setDialogs(DialogsStore.dialogs)
        }
    }, [DialogsStore.dialogs])



 
    const SwipeHandlers = useSwipeable({ 
        onSwipedLeft: 
        ({ event }) => {
            if (Math.ceil(event.currentTarget.childElementCount / 4) >= currentSlide + 2) {
                event.currentTarget.style.transform = `translate3d(calc(${(currentSlide+1) * -100}% - ${(currentSlide+1)*8}px), 0, 0)`;
                setCurrentSlide(currentSlide + 1)
            }
        },         
        onSwipedRight:  
        ({ event }) => {
            if (currentSlide-1 >=  0) {
                event.currentTarget.style.transform = `translate3d(calc(${(currentSlide-1) * -100}% - ${(currentSlide-1)*8}px), 0, 0)`;
                setCurrentSlide(currentSlide - 1)
            }
        }
    })

    const refPassthrough = (el) => {
        SwipeHandlers.ref(el);
    }

    return (
        <BaseDialogs dialogs={dialogs} {...SwipeHandlers} ref={refPassthrough}/>
    );
};

export default observer(PinnedDialogs);