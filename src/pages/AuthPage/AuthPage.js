import React, { useState } from 'react';
import { LoginForm } from 'components';
import { RegisterForm } from 'containers';

import styles from './AuthPage.module.scss'
import { Button } from 'antd';
import Waves from 'styles/Waves';

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState('LoginForm')

    return (
        <section className={styles.auth}>
            <div className={styles.auth__buttons}>
                <Button size="large" className={styles.auth__switchButton} onClick={() => setActiveForm('RegisterForm')}>Зарегистрироваться</Button>
                <Button size="large" className={styles.auth__switchButton} onClick={() => setActiveForm('LoginForm')}>Войти</Button>
            </div>
            <div 
                className={styles.auth__formsContainer} 
                style={activeForm == 'LoginForm' ? {top: '200px'} : {top: '0'}}
            >
                <Waves style={{top: '-98px'}}/>
                <div className={styles.auth__formsSuperContainer}>
                    <div 
                        className={styles.auth__loginFormContainer} 
                        style={activeForm == 'LoginForm' ? {top: '100%'} : {top: '0'}}
                    >
                        <RegisterForm />
                    </div>
                    <div 
                        className={styles.auth__registerFormContainer} 
                        style={activeForm == 'LoginForm' ? {bottom: '0'} : {bottom: '100%'}}
                    >
                        <LoginForm/>
                    </div>
                </div>
                <Waves style={{transform: 'rotate(180deg)', bottom: '-98px'}}/>
            </div>
        </section>
    );
};

export default AuthPage;