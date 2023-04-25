import { observer } from 'mobx-react';
import React, { createRef, useLayoutEffect } from 'react';

import styles from './MessageList.module.scss';

const MessagesList = ({ items, MessagesReadFunc, userUid }) => {
    let messageListRef = createRef();

    const scrollToBottom = () => {
        messageListRef.current.scrollBy(0, Math.max(
            messageListRef.current.scrollHeight,
            messageListRef.current.offsetHeight,
            messageListRef.current.clientHeight
        ))
    }
    const checkVisibilityOfItems = (ref, items) => {
        if(ref.current) {
            const messageListOffsets = ref.current.getBoundingClientRect()
            let newItems = [];
            items.forEach((item, index) => {
                if (item.props.author != userUid && !Object.values(item.props.readed).every(item => item)) {
                    const itemOffsets = ref.current.childNodes[index].getBoundingClientRect()
                    if(messageListOffsets.height + messageListOffsets.top >= itemOffsets.height + itemOffsets.top) {
                        newItems.push(item)
                    }
                }
            })
            MessagesReadFunc(newItems)
        }
    }


    useLayoutEffect(() => {
        messageListRef.current.addEventListener('scroll', () => checkVisibilityOfItems(messageListRef, items))
        scrollToBottom();
    })

    return (
        <section className={styles.messagesList} ref={messageListRef}>
            {items && items.map((item) => 
                item
            )}
        </section>
    );
};

export default observer(MessagesList);