import { Avatar, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RecentDialog.module.scss';
import { Status, Time } from 'components';
import pin from 'assets/pin.svg';
import unpin from 'assets/unpin.svg';


const RecentDialog = React.forwardRef(({name, avatar, lastMessage, unreadCount, isPinned, precenseData, dialogId, onPinButtonClick, onDeleteButtonClick}, ref) => {

    return (
        <div className={styles.dialogContainer} ref={ref}>
            <Link to={`dialog/${dialogId}`} style={{ textDecoration: 'none', width: '100%' }}>
                <div className={styles.dialog}>
                    <Status isOnline={precenseData && precenseData.state == 'online' ? true : false}>
                        <Avatar className={styles.dialog__avatar} src={avatar}/>
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
                        icon=<img src={isPinned ? unpin : pin}/>
                        onClick={() => onPinButtonClick()}
                    />
                </li>
                <li>
                    <Button 
                        className={styles.dialogButtons__button} 
                        style={{backgroundColor: "#ff4d4f"}}
                        icon={<DeleteOutlined style={{fontSize: '22px', color:'#fff'}}/>}
                        onClick={() => onDeleteButtonClick()}
                    />
                </li>
            </ul>
        </div>
    );
});

export default observer(RecentDialog);