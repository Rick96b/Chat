import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { RecentDialog } from 'components';
import styles from './RecentDialogs.module.scss';
import classNames from 'classnames';

const RecentDialogs = ({ dialogs }) => {
    return (
        <section className={styles.recentDialogs}>
            <div className={styles.recentDialogs__header}>
                    <h2>Recent Chats</h2>
                    <SearchOutlined className={styles.recentDialogs__search}/>
            </div>
            <ul className={styles.recentDialogs__groups}>
                <li className={classNames(styles.recentDialogs__group, styles.recentDialogs__groupActive)}>
                    <button>All chats</button>
                </li>
                <li className={styles.recentDialogs__group}>
                    <button>Personal</button>
                </li>
                <li className={styles.recentDialogs__group}>
                    <button>Work</button>
                </li>
                <li className={styles.recentDialogs__group}>
                    <button>Group</button>
                </li>
            </ul>
            <ul className={styles.recentDialogs__dialogs}>
                {dialogs.map(dialog => 
                    <li>
                        <RecentDialog
                            name={dialog.name}
                            lastMessage={dialog.lastMessage}
                            unreadCount={dialog.unreadCount}
                            isOnline={dialog.isOnline}
                        />
                    </li>
                )}
            </ul>
        </section>
    );
};

export default RecentDialogs;