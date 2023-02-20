import { Avatar } from 'antd';
import React from 'react';

import styles from './MessageBlock.module.scss';

const MessagesBlock = ({ items, author}) => {
    return (
        <div className={styles.messageBlock}>
            <Avatar className={styles.messageBlock__avatar} />
            <div className={styles.messageBlock__messages}>
                {items.map((message) => 
                    message
                )}
            </div>
        </div>
    );
};

export default MessagesBlock;