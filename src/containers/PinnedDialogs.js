import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {PinnedDialogs as BaseDialogs} from 'components';
import { observer } from 'mobx-react-lite';
import { RootStore } from 'store';

const PinnedDialogs = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
 
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

    const pinnedDialogs = RootStore.dialogsStore.dialogs.filter(dialog => dialog.isPinned)

    return (
        <BaseDialogs dialogs={pinnedDialogs} {...SwipeHandlers} ref={refPassthrough}/>
    );
};

export default observer(PinnedDialogs);