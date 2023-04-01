import React, { useState } from 'react';
import { RegisterForm, LoginForm } from 'containers';

import styles from './AuthPage.module.scss'
import { Button } from 'antd';
import Waves from 'styles/Waves';

const AuthPage = () => {
    const [activeForm, setActiveForm] = useState('LoginForm')

    return (
        <section className={styles.authPage}>
            <div className={styles.authPage__contentContainer}>
                <div className={styles.authPage__formsContainer}>
                    <div 
                        className={styles.authPage__form}
                        style={activeForm == 'LoginForm' 
                            ? {right: "50%", transform: 'translateX(50%)'}
                            : {right: "150%", transform: 'translateX(50%)'}}
                    >
                        <LoginForm />
                    </div>
                    <div 
                        className={styles.authPage__form}
                        style={activeForm == 'LoginForm' 
                            ? {left: "150%", transform: 'translateX(-50%)'}
                            : {left: "50%", transform: 'translateX(-50%)'}}
                    >
                        <RegisterForm />
                    </div>
                </div>
                <Waves style={{transform: 'rotate(180deg)'}}/>
            </div>
            <div className={styles.authPage__buttonsContainer}>
                <Button 
                    shape='round' 
                    onClick={() => setActiveForm('LoginForm')} 
                    className={styles.authPage__switchButton}
                    style={activeForm == 'LoginForm' 
                        ? {left: "150%", transform: 'translateX(-50%)'}
                        : {left: "50%", transform: 'translateX(-50%)'}}
                >
                    Войти
                </Button>
                <Button 
                    shape='round' 
                    onClick={() => setActiveForm('RegisterForm')} 
                    className={styles.authPage__switchButton}
                    style={activeForm == 'LoginForm' 
                        ? {right: "50%", transform: 'translateX(50%)'}
                        : {right: "150%", transform: 'translateX(50%)'}}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </section>
    );
};

export default AuthPage;