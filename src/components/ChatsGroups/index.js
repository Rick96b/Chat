import React from 'react';

import styles from './ChatsGroups.module.scss';
import { Button } from 'antd';

const ChatsGroups = () => {
    return (
        <ul className={styles.chatsGroups}>
            <li className={styles.chatGroup}>
                <Button>Dialogs</Button>
            </li>
            <li className={styles.chatGroup}>
                <Button>Group chats</Button>
            </li>
        </ul>
    );
};

export default ChatsGroups;