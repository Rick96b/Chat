import React from 'react';
import { Avatar } from 'antd';

import styles from './UserInfoModal.module.scss';

const UserInformationPage = ({user}) => {
    return (
        <>
            <section className={styles.userPage}>
                <Avatar className={styles.userPage__headerAvatar} src={user.avatar}/>
                <div className={styles.userPage__headerUserInfo}>
                    <p className={styles.userPage__headerUserName}>
                        {user.login}
                    </p>
                    <p className={styles.userPage__headerUserDescription}>
                        {user.description
                        ? 
                        user.description 
                        : 
                        <span style={{color: '#4F5E7B'}}>Write something about you!</span>}
                    </p>
                </div>
            </section>
        </>
    );
};

export default UserInformationPage;