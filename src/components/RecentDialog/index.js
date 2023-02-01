import { Avatar } from 'antd';
import classNames from 'classnames';
import { Status, Time } from 'components';
import React from 'react';

import styles from './RecentDialog.module.scss';

const RecentDialog = ({name, lastMessage, unreadCount, isOnline}) => {
    return (
        <div className={styles.dialog}>
            <Status isOnline={isOnline}>
                <Avatar className={styles.dialog__avatar} />
            </Status>
            <div className={styles.dialog__content}>
                <div className={styles.dialog__top}>
                    <p className={styles.dialog__name}>{ name }</p>
                    <Time className={styles.dialog__date} date="Fri Jul 24 2020 16:35:42 GMT+0500 (Екатеринбург, стандартное время)"/>
                </div>
                <div className={styles.dialog__bottom}>
                    <p className={styles.dialog__text}>{ lastMessage.text }</p>
                    <div className={classNames(styles.dialog__unread, unreadCount > 0 ? '' : styles.dialog__read)}>
                        <span>{unreadCount > 9 ? '+9' : unreadCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentDialog;