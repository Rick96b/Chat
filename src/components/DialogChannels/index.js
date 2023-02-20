import React from 'react';
import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';


import styles from './DialogChannels.module.scss';


const DialogChannels = ({ isOpen, channelsListHandler, changeChannel }) => {
    return (
        <section className={classNames(styles.dialogChannels, isOpen ? styles.dialogChannelsActive : '')}>
            <div className={styles.dialogChannels__currentDialogContainer}>
                <h2 className={styles.dialogChannels__title}>Channels</h2>
                <p className={styles.dialogChannels__name} id='currentChannel'># General</p>
                <Button 
                    icon={<UpOutlined />} 
                    onClick={() => channelsListHandler()} 
                    className={classNames(styles.dialogChannels__openListButton,
                        isOpen ? styles.dialogChannels__openListButtonActive : '')
                    }
                />
            </div>
            <ul className={styles.dialogChannels__list}>
                <li className={styles.dialogChannels__channel}>
                    <button 
                        className={classNames(styles.dialogChannels__channelSwitchButton,
                        styles.dialogChannels__channelSwitchButtonActive)}
                        onClick={event => changeChannel(event)}
                        id='General'
                    ># General</button>
                </li>
                <li className={styles.dialogChannels__channel}>
                    <button 
                        className={styles.dialogChannels__channelSwitchButton}
                        onClick={event => changeChannel(event)}
                        id='DesignTeam'
                    >
                    # Design team</button>
                </li>
                <li className={styles.dialogChannels__channel}>
                    <button 
                        className={styles.dialogChannels__channelSwitchButton}
                        onClick={event => changeChannel(event)}
                        id='UXWriter'
                    ># UX Writer</button>
                </li>
                <li className={styles.dialogChannels__channel}> 
                    <button 
                        className={styles.dialogChannels__channelSwitchButton}
                        onClick={event => changeChannel(event)}
                        id='Projects'
                    ># Projects</button>
                </li>
            </ul>
        </section>
    );
};

export default DialogChannels;