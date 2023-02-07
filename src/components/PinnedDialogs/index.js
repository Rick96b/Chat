import { Avatar } from 'antd';
import PinnedDialog from 'components/PinnedDialog';
import React from 'react';

import styles from './PinnedDialogs.module.scss';

const PinnedDialogs = React.forwardRef(({ dialogs }, ref) => {
    return (
        /* Проверить наличие диалогов в целом */
        <section className={styles.pinnedDialogs}>
                <div className={styles.pinnedDialogs__header}>
                    <h2>Pinned Chats</h2>
                    <Avatar className={styles.pinnedDialogs__avatar} />
                </div>
                <div className={styles.pinnedDialogs__contentContainer}>
                    <ul ref={ref} className={styles.pinnedDialogs__content}>
                        {dialogs.map(dialog => 
                            <li className={styles.pinnedDialog}>
                                <PinnedDialog 
                                    name={dialog.name}
                                    lastMessage={dialog.lastMessage.text}
                                    isOnline={dialog.isOnline}
                                    isUnreadMessages={!!dialog.unreadCount}
                                />
                            </li>
                        )}
                    </ul>
                </div>
        </section>
    );
});

export default PinnedDialogs;