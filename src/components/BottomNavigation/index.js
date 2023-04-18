import React from 'react';
import { Button } from 'antd';

import styles from './BottomNavigation.module.scss';
import profileDefault from 'assets/profileDefault.svg';
import profileActive from 'assets/profileActive.svg';



const BottomNavigation = ({handleModal, isProfileActive}) => {
    return (
        <section className={styles.bottomNavigation}>
            <Button onClick={() => handleModal(true)} className={styles.bottomNavigation__profile} icon={
                <img src={isProfileActive ? profileActive : profileDefault} className={styles.bottomNavigation__profileIcon}/>
            } />
        </section>
    );
};

export default BottomNavigation;