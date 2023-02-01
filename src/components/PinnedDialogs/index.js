import { Avatar } from 'antd';
import PinnedDialog from 'components/PinnedDialog';
import React from 'react';

import styles from './PinnedDialogs.module.scss';

const PinnedDialogs = ({ dialogs }) => {
    return (
        /* Проверить наличие диалогов в целом */
        <section className={styles.pinnedDialogs}>
                <div className={styles.pinnedDialogs__header}>
                    <h2>Pinned Chats</h2>
                    <Avatar className={styles.pinnedDialogs__avatar} />
                </div>
                <ul className={styles.pinnedDialogs__content}>
                    {dialogs.map(dialog => 
                        <li className={styles.pinnedDialog}>
                            <PinnedDialog 
                                firstname={dialog.firstname} 
                                lastname={dialog.lastname}
                                lastMessage={dialog.lastMessage.text}
                                isOnline={false}
                                isUnreadMessages={true}
                            />
                        </li>
                    )}
                </ul>
        </section>
    );
};

export default PinnedDialogs;