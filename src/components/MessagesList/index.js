import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';

import styles from './MessageList.module.scss';

const MessagesList = ({ items, MessagesReadFunc }) => {
    let messageListRef = useRef();

    const scrollToBottom = () => {
        messageListRef.current?.scrollBy(0,
            Math.max(
                messageListRef.current.scrollHeight,
                messageListRef.current.offsetHeight,
                messageListRef.current.clientHeight
            )
        );
    }

    const checkVisibilityOfItems = () => {
        const messageListOffsets = messageListRef.current.getBoundingClientRect()
        let newItems = [];
        items.forEach((item, index) => {
            const itemOffsets = messageListRef.current.childNodes[index].getBoundingClientRect()
            if(messageListOffsets.height + messageListOffsets.top >= itemOffsets.height + itemOffsets.top) {
                newItems.push(item)
            }
        })
        MessagesReadFunc(newItems)
    }


    useEffect(() => {
        messageListRef.current.addEventListener('scroll', checkVisibilityOfItems)
        checkVisibilityOfItems()
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