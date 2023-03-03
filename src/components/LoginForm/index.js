import React from 'react';
import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import styles from './LoginForm.module.scss';

const LoginForm = (props) => {
    return (
        <div className={styles.authForm}>
            <div className={styles.authForm__top}>
                <h2>Войти в аккаунт</h2>
            </div>
            <ul className={styles.authForm__socialNetworksList}>
                <li>
                    <Button 
                        className={styles.authForm__socialNetworksItem}
                        size='large' 
                        shape="circle" 
                        icon={<GooglePlusOutlined />}
                    />
                </li>
                <li>
                    <Button 
                        className={styles.authForm__socialNetworksItem}
                        size='large' 
                        shape="circle" 
                        icon={<TwitterOutlined />}
                    />
                </li>
                <li>
                    <Button 
                        className={styles.authForm__socialNetworksItem}
                        size='large' 
                        shape="circle" 
                        icon={<InstagramOutlined />}  
                    />
                </li>
            </ul>
            <Form
                name="normal_login"
                className={styles.authForm__form}
            >
                <Form.Item name="username" style={{marginBottom: '16px'}}>
                    <Input 
                        size='large' 
                        placeholder="Username" 
                        className={styles.authForm__input} 
                    />
                </Form.Item>
                <Form.Item name="password" style={{margin: '0'}}> 
                    <Input
                        type="password"
                        placeholder="Password"
                        size="large"
                        className={styles.authForm__input} 
                    />
                </Form.Item>
                <Form.Item  style={{margin: '15px 0 15px'}}>
                    <button className={styles.authForm__forgotPasswordButton}>
                        Забыли пароль?
                    </button>
                </Form.Item>
                <Form.Item style={{margin: '0'}}>
                    <button className={styles.authForm__submitButton}>
                        Войти
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm;