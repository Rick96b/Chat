import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BottomNavigation.module.scss';
import profileDefault from 'assets/profileDefault.svg';
import profileActive from 'assets/profileActive.svg';
import messageActive from 'assets/messageActive.svg';
import messageDefault from 'assets/messageDefault.svg';


const BottomNavigation = ({isMessageActive=false, isProfileActive=false}) => {
    return (
        <section className={styles.bottomNavigation}>
            <ul className={styles.bottomNavigation__list}>
                <li className={styles.bottomNavigation__item}>
                    <Link to='/'>
                    <img src={isMessageActive ? messageActive : messageDefault} className={styles.bottomNavigation__messages}/>
                    </Link>
                </li>
                <li className={styles.bottomNavigation__item}>
                    <Link to='/userInfo'>
                        <img src={isProfileActive ? profileActive : profileDefault} className={styles.bottomNavigation__profile}/>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default BottomNavigation;