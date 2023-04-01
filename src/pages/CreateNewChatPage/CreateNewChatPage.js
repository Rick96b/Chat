import { Avatar, Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Status, Time } from 'components';
import React from 'react';

import styles from './CreateNewChatPage.module.scss';
import { Link } from 'react-router-dom';

const CreateNewChatPage = ({users, createChatFunc, usersStatus}) => {
    console.log(usersStatus)
    return (
        <div className={styles.createNewChat}>
            <header className={styles.createNewChat__header}>
                <div className={styles.createNewChat__headerContentContainer}>
                  <Link to='/' style={{textDecoration: 'none'}}>
                    <Button icon={<ArrowLeftOutlined />} className={styles.createNewChat__backButton}/>
                  </Link>
                  <h2 className={styles.createNewChat__title}>Create new chat</h2>
                </div>
                <Form className={styles.createNewChat__searchForm}>
                  <Input placeholder='Search' className={styles.createNewChat__searchInput}/>
                </Form>
            </header>
            <section className={styles.createNewChat__users}>
                {users && users.map((user) => 
                    <Link to='/' onClick={() => createChatFunc(user)} style={{textDecoration: 'none'}}>
                        <div className={styles.createNewChat__user}>
                            <Status isOnline={
                                usersStatus.filter(userStatus => userStatus.uid == user.uid)[0].state == 'online'
                                }>
                                <Avatar className={styles.createNewChat__userAvatar}/>
                            </Status>
                            <div className={styles.createNewChat__userInfo}>
                                <p className={styles.createNewChat__userName}>{ user.login }</p>
                                <p className={styles.createNewChat__userDescription}>{ 
                                    usersStatus.filter(userStatus => userStatus.uid == user.uid)[0].state == 'online' 
                                    ?
                                    'online' 
                                    : 
                                    <div>
                                        <span>Was online at </span>
                                        <Time date={usersStatus.filter(userStatus => userStatus.uid == user.uid)[0].last_changed} />
                                    </div>
                                }</p>
                            </div>
                        </div>
                    </Link>
                )}
            </section>
        </div>
    );
};

export default CreateNewChatPage;