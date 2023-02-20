import { BottomNavigation, AddNewChatButton } from 'components';
import { RecentDialogs, PinnedDialogs} from 'containers';
import React from 'react';

import styles from './Home.module.scss';


const Home = () => {
    return (
        <div className={styles.chatHome}>
              <PinnedDialogs/>
              <RecentDialogs/>
              <BottomNavigation />
              <div className={styles.AddNewChatButton} >
                <AddNewChatButton />
              </div>
        </div>
    );
};

export default Home;