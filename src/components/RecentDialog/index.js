import { Avatar, Button } from 'antd';
import classNames from 'classnames';
import { Status, Time } from 'components';
import { PushpinOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RecentDialog.module.scss';
import { observer } from 'mobx-react';


const RecentDialog = React.forwardRef(({name, lastMessage, unreadCount, precenseData, dialogId, onPinButtonClick}, ref) => {
    return (
        <div className={styles.dialogContainer} ref={ref}>
            <Link to={`dialog/${dialogId}`} style={{ textDecoration: 'none', width: '100%' }}>
                <div className={styles.dialog}>
                    <Status isOnline={precenseData && precenseData.state == 'online' ? true : false}>
                        <Avatar className={styles.dialog__avatar} />
                    </Status>
                    <div className={styles.dialog__content}>
                        <div className={styles.dialog__top}>
                            <p className={styles.dialog__name}>{ name }</p>
                            { lastMessage.createdAt && 
                                <p className={styles.dialog__date}>
                                    <Time timestamp={true} date={ lastMessage.createdAt }/>
                                </p>
                            }
                        </div>
                        <div className={styles.dialog__bottom}>
                            <p className={styles.dialog__text}>{ lastMessage.text ? lastMessage.text : ""}</p>
                            <div className={classNames(styles.dialog__unread, unreadCount > 0 ? '' : styles.dialog__read)}>
                                <span>{unreadCount > 9 ? '+9' : unreadCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <ul className={styles.dialogButtons}>
                <li>
                    <Button 
                        className={styles.dialogButtons__button} 
                        icon={<PushpinOutlined style={{color: 'white', fontSize: '22px'}}/>} 
                        onClick={(event) => onPinButtonClick(event)}
                    />
                </li>
            </ul>
        </div>
    );
});

export default observer(RecentDialog);