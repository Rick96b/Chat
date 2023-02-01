import { Avatar } from 'antd';
import { PinnedDialogs } from 'components';
import React from 'react';

import styles from './Home.module.scss';

const Home = () => {
    let dialogs = [
        {
          firstname: 'Valentine',
          lastname: 'Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'}
        },
        {
          firstname: 'Valentine',
          lastname: 'Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'}
        },
        {
          firstname: 'Valentine',
          lastname: 'Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'}
        },
        {
          firstname: 'Valentine',
          lastname: 'Sidorov',
          lastMessage: {text:'Fuck you and your family and your sister and your brother'}
        },
    ]

    return (
        <div className={styles.chatHome}>
            <PinnedDialogs dialogs={dialogs} />
        </div>
    );
};

export default Home;