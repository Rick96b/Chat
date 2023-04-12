import React from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';

import styles from './UserInformationPage.module.scss';
import { Avatar } from 'antd';
import { BottomNavigation } from 'components';


const UserInformationPage = ({user}) => {
    return (
        <>
        <section className={styles.userPage}>
            <header className={styles.userPage__header}>
                <div className={styles.userPage__headerSettings}>
                    <p>Settings</p>
                    <Link to='/userInfoEdit'>
                        <FormOutlined />
                    </Link>
                </div>
                <div className={styles.userPage__headerUserSection}>
                    <Avatar className={styles.userPage__headerAvatar} src={user.avatar}/>
                    <div className={styles.userPage__headerUserInfo}>
                        <p className={styles.userPage__headerUserName}>
                            {user.login}
                        </p>
                        <p className={styles.userPage__headerUserDescription}>
                            {user.descriptions 
                            ? 
                            user.descriptions 
                            : 
                            <span style={{color: '#4F5E7B'}}>Write something about you!</span>}
                        </p>
                    </div>
                </div>
            </header>
        </section>
        <BottomNavigation isProfileActive={true} />
        </>
    );
};

export default UserInformationPage;