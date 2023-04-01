import React from 'react';
import { Form, Input, Button } from 'antd';
import { GooglePlusOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import styles from './RegisterForm.module.scss';

const success = false;


const RegisterForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <div className={styles.authForm}>
            <div className={styles.authForm__top}>
                <h2>Регистрация</h2>
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
                name="RegisterForm"
                className={styles.authForm__form}
                onSubmit={handleSubmit}
            >
                <Form.Item style={{marginBottom: '16px'}}>
                    <Input 
                        size='large' 
                        placeholder="Логин" 
                        id='login'
                        value={values.login}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.authForm__input}
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={
                        !touched.email ? '' : errors.email ? 'error' : 'success'
                    }
                    hasFeedback
                    style={{marginBottom: '16px'}}
                >
                    <Input 
                        size='large'
                        placeholder="Почта" 
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.authForm__input}
                    />
                </Form.Item>
                <Form.Item
                    validateStatus={
                        !touched.password ? '' : errors.password ? 'error' : 'success'
                    }
                    hasFeedback
                >
                    <Input
                        type="password"
                        size='large'
                        placeholder="Пароль" 
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.authForm__input}
                    />
                </Form.Item>
                <Button onClick={handleSubmit} htmltype="submit" style={{marginTop: '20px'}} className={styles.authForm__submitButton}>
                    Регистрация
                </Button>
            </Form> 
                   {/*  <div className="auth__success-block">
                        <div>
                            <ExclamationCircleTwoTone />
                        </div>
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>
                            На Вашу почту отправлено письмо с ссылкой на подтверждение
                            аккаунта.
                        </p>
                    </div> */}
        </div>
    )

}

export default RegisterForm;