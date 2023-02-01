import { Badge } from 'antd';
import React from 'react';
import classNames from 'classnames';

import styles from './Status.module.scss';

const Status = ({isOnline, children}) => {
    return (
        <Badge dot offset={['0', '24px']} className={classNames(styles.status, isOnline ? styles.online : styles.offline)}>
            {children}
        </Badge>
    );
};

export default Status;