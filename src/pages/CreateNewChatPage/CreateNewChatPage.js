import { Avatar, Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Status } from 'components';
import React from 'react';

import styles from './CreateNewChatPage.module.scss';
import { Link } from 'react-router-dom';

const CreateNewChatPage = ({users, createChatFunc}) => {
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
            <Button className={styles.createNewChat__createGroupChatButton}>
              Create group chat
            </Button>
            <section className={styles.createNewChat__users}>
                {users && users.map((user) => 
                    <Link to='/' onClick={() => createChatFunc(user)}>
                        <div className={styles.createNewChat__user}>
                            <Status isOnline={true}>
                                <Avatar className={styles.createNewChat__userAvatar}/>
                            </Status>
                            <div className={styles.createNewChat__userInfo}>
                                <p className={styles.createNewChat__userName}>{ user.login }</p>
                                <p className={styles.createNewChat__userDescription}>{ user.description }</p>
                            </div>
                        </div>
                    </Link>
                )}
            </section>
        </div>
    );
};

export default CreateNewChatPage;