import React from 'react';
import { SmileOutlined, PaperClipOutlined, AudioFilled } from '@ant-design/icons';

import styles from './MessageInput.module.scss';
import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const MessageInput = () => {
    return (
        <section className={styles.messageInput}>
            <Button icon={<SmileOutlined />} className={styles.messageInput__stikersButton} />
            <Form className={styles.messageInput__form}>
                <TextArea autoSize={{minRows: 1, maxRows: 5}} className={styles.messageInput__textInput}/>
            </Form>
            <Button icon={<PaperClipOutlined />} className={styles.messageInput__fileButton} />
            <Button icon={<AudioFilled />} shape='circle' className={styles.messageInput__sendButton} />
        </section>
    );
};

export default MessageInput;