import React from 'react';
import { MessageFilled, UserOutlined } from '@ant-design/icons';

import styles from './BottomNavigation.module.scss';
import profileDefault from 'assets/profileDefault.svg';
import profileActive from 'assets/profileActive.svg';
import messageActive from 'assets/messageActive.svg';
import messageDefault from 'assets/messageDefault.svg';

const BottomNavigation = () => {
    return (
        <section className={styles.bottomNavigation}>
            <ul className={styles.bottomNavigation__list}>
                <li className={styles.bottomNavigation__item}>
                    <img src={messageActive} className={styles.bottomNavigation__messages}/>
                </li>
                <li className={styles.bottomNavigation__item}>
                    <img src={profileDefault} className={styles.bottomNavigation__profile}/>
                </li>
            </ul>
        </section>
    );
};

export default BottomNavigation;