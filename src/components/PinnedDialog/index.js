import { Avatar } from 'antd';
import classNames from 'classnames';
import Status from 'components/Status';
import React from 'react';

import styles from './PinnedDialog.module.scss';

const PinnedDialog = ({ name, avatar, lastMessage, isOnline, isUnreadMessages }) => {
    return (
        <div className={classNames(styles.pinnedDialog, isUnreadMessages ? styles.unread : '')}>
            <div className={styles.partnerInfo}>
                <Status isOnline={isOnline}>
                    <Avatar className={styles.partnerAvatar}/>
                </Status>
                <p className={styles.partnerName}>{ name }</p>
            </div>
            <p className={styles.lastMessage}>{ lastMessage }</p>
        </div>
    );
};

export default PinnedDialog;