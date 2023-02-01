import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { RecentDialog } from 'components';
import styles from './RecentDialogs.module.scss';
import classNames from 'classnames';

const RecentDialogs = ({ dialogs, activeGroup, changeActiveGroup }) => {
    return (
        <section className={styles.recentDialogs}>
            <div className={styles.recentDialogs__header}>
                    <h2>Recent Chats</h2>
                    <SearchOutlined className={styles.recentDialogs__search}/>
            </div>
            <ul className={styles.recentDialogs__groups}>
                <li className={classNames(styles.recentDialogs__group, 
                        activeGroup == 'All chats' ? styles.recentDialogs__groupActive : '')}>
                    <button onClick={event => changeActiveGroup(event.target.value)} value='All chats'>All chats</button>
                </li>
                <li className={classNames(styles.recentDialogs__group, 
                        activeGroup == 'Personal' ? styles.recentDialogs__groupActive : '')}>
                    <button onClick={event => changeActiveGroup(event.target.value)} value='Personal'>Personal</button>
                </li>
                <li className={classNames(styles.recentDialogs__group, 
                        activeGroup == 'Work' ? styles.recentDialogs__groupActive : '')}>
                    <button onClick={event => changeActiveGroup(event.target.value)} value='Work'>Work</button>
                </li>
                <li className={classNames(styles.recentDialogs__group, 
                        activeGroup == 'Group' ? styles.recentDialogs__groupActive : '')}>
                    <button onClick={event => changeActiveGroup(event.target.value)} value='Group'>Group</button>
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