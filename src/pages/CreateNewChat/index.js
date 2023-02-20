import { Avatar, Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Status } from 'components';
import React from 'react';

import styles from './CreateNewChat.module.scss';
import { Link } from 'react-router-dom';

const CreateNewChat = () => {
    let users = [
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
        {
          name: 'Vasya Pupkin',
          description: 'Fuck you',
        },
      ]

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
                    <div className={styles.createNewChat__user}>
                        <Status isOnline={true}>
                            <Avatar className={styles.createNewChat__userAvatar}/>
                        </Status>
                        <div className={styles.createNewChat__userInfo}>
                            <p className={styles.createNewChat__userName}>{ user.name }</p>
                            <p className={styles.createNewChat__userDescription}>{ user.description }</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CreateNewChat;