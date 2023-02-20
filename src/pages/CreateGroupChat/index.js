import { Avatar, Button, Checkbox, Form, Input, Upload } from 'antd';
import { Status } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CreateGroupChat.module.scss'

const CreateGroupChat = () => {
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
        <>
            <div className={styles.createGroupChat} style={{display: 'none'}}>
                <header className={styles.createGroupChat__header}>
                    <div className={styles.createGroupChat__headerContentContainer}>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <Button className={styles.createGroupChat__backButton}>Back</Button>
                        </Link>
                        <h2 className={styles.createGroupChat__title}>Create group chat</h2>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <Button className={styles.createGroupChat__nextButton}>Next</Button>
                        </Link>
                    </div>
                    <Form className={styles.createGroupChat__searchForm}>
                        <Input placeholder='Search' className={styles.createGroupChat__searchInput}/>
                    </Form>
                </header>
                <section className={styles.createGroupChat__users}>
                    {users && users.map((user) => 
                        <Checkbox className={styles.createGroupChat__checkbox}>
                            <div className={styles.createGroupChat__user}>
                                <Status isOnline={true}>
                                    <Avatar className={styles.createGroupChat__userAvatar}/>
                                </Status>
                                <div className={styles.createGroupChat__userInfo}>
                                    <p className={styles.createGroupChat__userName}>{ user.name }</p>
                                    <p className={styles.createGroupChat__userDescription}>{ user.description }</p>
                                </div>
                            </div>
                        </Checkbox>
                    )}
                </section>
            </div>
            <div className={styles.finalGroupCreating}>
                <header className={styles.finalGroupCreating__header}>
                        <Button className={styles.finalGroupCreating__backButton}>Back</Button>
                        <h2 className={styles.finalGroupCreating__title}>Group</h2>
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <Button className={styles.finalGroupCreating__nextButton}>Create</Button>
                        </Link>
                </header>
                <section>
                    <Form>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                        >
                            Get this here
                        </Upload>
                    </Form>
                </section>
            </div>
        </>
    );
};

export default CreateGroupChat;