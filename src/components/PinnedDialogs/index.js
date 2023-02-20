import { Avatar } from 'antd';
import PinnedDialog from 'components/PinnedDialog';
import React from 'react';
import { Link } from 'react-router-dom';

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
                        {dialogs && dialogs.map(dialog => 
                            <li className={styles.pinnedDialog}>
                                <Link to={`dialog/${dialog.id}`} style={{ textDecoration: 'none' }}>
                                    <PinnedDialog 
                                        name={dialog.name}
                                        lastMessage={dialog.lastMessage.text}
                                        isOnline={dialog.isOnline}
                                        isUnreadMessages={!!dialog.unreadCount}
                                    />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
        </section>
    );
});

export default PinnedDialogs;