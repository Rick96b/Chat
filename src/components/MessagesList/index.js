import React from 'react';

import styles from './MessageList.module.scss';

const MessagesList = ({ items }) => {
    return (
        <section className={styles.messagesList}>
            {items && items.map((item) => 
                item
            )}
        </section>
    );
};

export default MessagesList;