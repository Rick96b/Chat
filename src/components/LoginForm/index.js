import React from 'react';
import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import styles from './LoginForm.module.scss';

const LoginForm = (props) => {
    const {
        values,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

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
                name="LoginForm"
                className={styles.authForm__form}
            >
                <Form.Item name="email" style={{marginBottom: '16px'}}>
                    <Input 
                        size='large' 
                        placeholder="Почта" 
                        id='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.authForm__input} 
                    />
                </Form.Item>
                <Form.Item name="password" style={{margin: '0'}}> 
                    <Input
                        type="password"
                        size='large'
                        placeholder="Пароль" 
                        id="password"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.authForm__input} 
                    />
                </Form.Item>
                {status && status.firebaseErrorMessage && <p className={styles.authForm__errorMessage}>
                    {status.firebaseErrorMessage}
                </p>}
                <Form.Item style={{marginTop: '25px'}}>
                    <Button onClick={handleSubmit} htmlType="submit" className={styles.authForm__submitButton}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm;