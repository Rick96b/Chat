import React from 'react';
import { SmileOutlined, PaperClipOutlined, AudioFilled } from '@ant-design/icons';

import styles from './MessageInput.module.scss';
import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const MessageInput = ({resizeFunc, submitFunc}) => {
    return (
        <section className={styles.messageInput}>
            <Button icon={<SmileOutlined />} className={styles.messageInput__stikersButton} />
            <Form className={styles.messageInput__form} onFinish={submitFunc}>
                <Form.Item name="text" className={styles.messageInput__formItem}>
                    <TextArea onResize={() => resizeFunc()} autoSize={{minRows: 1, maxRows: 5}} className={styles.messageInput__textInput}/>
                </Form.Item>
                <Form.Item  className={styles.messageInput__formItem}>
                    <Button icon={<PaperClipOutlined />} className={styles.messageInput__fileButton}/>
                </Form.Item>
                <Form.Item  className={styles.messageInput__formItem}>
                    <Button icon={<AudioFilled />} shape='circle' className={styles.messageInput__sendButton}  htmlType="submit"/>
                </Form.Item>
            </Form>
        </section>
    );
};

export default MessageInput;