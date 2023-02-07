import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import {PinnedDialogs as BaseDialogs} from 'components';

const PinnedDialogs = ({ dialogs }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
 
    const SwipeHandlers = useSwipeable({ 
        onSwipedLeft: 
        ({ event }) => {
            console.log(Math.ceil(event.currentTarget.childElementCount / 4))
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

export default PinnedDialogs;