import { Avatar } from 'antd';
import { PinnedDialogs, RecentDialogs } from 'components';
import React from 'react';

import styles from './Home.module.scss';

const Home = () => {
    let dialogs = [
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'},
          isOnline: true,
          unreadCount: 8,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'},
          isOnline: true,
          unreadCount: 4,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'},
          isOnline: false,
          unreadCount: 12,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'},
          isOnline: false,
          unreadCount: 0,
        },
    ]

    return (
        <div className={styles.chatHome}>
            <PinnedDialogs dialogs={dialogs} />
            <RecentDialogs dialogs={dialogs}/>
        </div>
    );
};

export default Home;