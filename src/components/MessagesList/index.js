import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';

import styles from './MessageList.module.scss';

const MessagesList = ({ items }) => {
    let messageListBottomRef = useRef();

    const scrollToBottom = () => {
        messageListBottomRef.current?.scrollBy(0,
            Math.max(
                messageListBottomRef.current.scrollHeight,
                messageListBottomRef.current.offsetHeight,
                messageListBottomRef.current.clientHeight
            )
        );
    }

    useEffect(() => {
        scrollToBottom()
    })
    

    return (
        <section className={styles.messagesList} ref={messageListBottomRef}>
            {items && items.map((item) => 
                item
            )}
        </section>
    );
};

export default observer(MessagesList);