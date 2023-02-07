import { PinnedDialogs } from 'containers';
import { BottomNavigation } from 'components';
import { RecentDialogs } from 'containers';
import React from 'react';

import styles from './Home.module.scss';
import { AddNewChatButton } from 'components';


const Home = () => {
    let dialogs = [
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 8,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 4,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: false,
          unreadCount: 12,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: false,
          unreadCount: 0,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 8,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 4,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: false,
          unreadCount: 12,
        },
        {
          name: 'Valya Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: false,
          unreadCount: 0,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 8,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: true,
          unreadCount: 4,
        },
        {
          name: 'Valentine Sidorov',
          lastMessage: {text:'Lorem ipsum des being the top fisshing text of all time'},
          isOnline: false,
          unreadCount: 12,
        },
    ]

    return (
        <div className={styles.chatHome}>
            <PinnedDialogs dialogs={dialogs}/>
            <RecentDialogs dialogs={dialogs}/>
            <BottomNavigation />
            <div className={styles.AddNewChatButton} >
              <AddNewChatButton />
            </div>
        </div>
    );
};

export default Home;