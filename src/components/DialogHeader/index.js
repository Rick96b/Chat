import { Avatar, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './DialogHeader.module.scss';
import Time from 'components/Time';

const DialogHeader = ({ dialogName, onlineData, avatar }) => {
    return (
        <section className={styles.dialogHeader}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Button icon={<ArrowLeftOutlined />} className={styles.dialogHeader__backButton}/>
            </Link>
            <div className={styles.dialogHeader__contentContainer}>
                <Avatar className={styles.dialogHeader__avatar} src={avatar}/>
                <div className={styles.dialogHeader__textContainer}>
                    <h2 className={styles.dialogHeader__dialogName}>{dialogName}</h2>
                    {
                        onlineData.state == 'online'
                        ?
                        <p className={styles.dialogHeader__dialogData}>online</p>
                        :
                        <p className={styles.dialogHeader__dialogData}>was online at <Time date={onlineData.last_changed} /></p>
                    }
                </div>
            </div>
        </section>
    );
};

export default DialogHeader;