import React from 'react';

import styles from './Home.module.scss';
import { BottomNavigation, AddNewChatButton } from 'components';
import { RecentDialogs, PinnedDialogs, UserModal} from 'containers';

const Home = ({isModalOpen, setModalOpen}) => {
    return (
      <>
        <div className={styles.chatHome}>
              <PinnedDialogs/>
              <RecentDialogs/>
              <BottomNavigation isMessageActive={true} handleModal={(state) => setModalOpen(state)}/>
              <div className={styles.AddNewChatButton} >
                <AddNewChatButton />
              </div>
        </div>
        <UserModal isOpen={isModalOpen} setOpen={setModalOpen}/>
      </>
    );
};

export default Home;