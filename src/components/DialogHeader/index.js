import { Avatar, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons';

import styles from './DialogHeader.module.scss';

const DialogHeader = ({ dialogName, onlineData }) => {
    return (
        <section className={styles.dialogHeader}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Button icon={<ArrowLeftOutlined />} className={styles.dialogHeader__backButton}/>
            </Link>
            <div className={styles.dialogHeader__contentContainer}>
                <Avatar className={styles.dialogHeader__avatar} />
                <div className={styles.dialogHeader__textContainer}>
                    <h2 className={styles.dialogHeader__dialogName}>{dialogName}</h2>
                    <p className={styles.dialogHeader__dialogData}>{onlineData}</p>
                </div>
            </div>
            <Button icon={<MoreOutlined />} className={styles.dialogHeader__moreButton}/>
        </section>
    );
};

export default DialogHeader;