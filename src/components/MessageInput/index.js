import React, { useRef } from 'react';
import { SmileOutlined, PaperClipOutlined, AudioFilled, SendOutlined } from '@ant-design/icons';

import styles from './MessageInput.module.scss';
import { Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { observer } from 'mobx-react';


const MessageInput = observer(({resizeFunc, onFinishFunc}) => {
    const [form] = Form.useForm();
    const textAreaRef = useRef()


    const submit = async (values) => {
        await onFinishFunc(values);
        form.setFieldValue('text', '');
    }

    const returnFocusOnTextArea = () => {
        textAreaRef.current.focus()
    }

    return (
        <section className={styles.messageInput}>
            <Button icon={<SmileOutlined />} className={styles.messageInput__stikersButton} />
            <Form form={form} className={styles.messageInput__form} onFinish={submit}>
                <Form.Item name="text" className={styles.messageInput__formItem}>
                    <TextArea ref={textAreaRef} onResize={() => resizeFunc()} autoSize={{minRows: 1, maxRows: 5}} className={styles.messageInput__textInput}/>
                </Form.Item>
                <Form.Item  className={styles.messageInput__formItem}>
                    <Button icon={<PaperClipOutlined />} className={styles.messageInput__fileButton}/>
                </Form.Item>
                <Form.Item  className={styles.messageInput__formItem}>
                    <Button icon={<SendOutlined />} onClick={returnFocusOnTextArea} shape='circle' className={styles.messageInput__sendButton}  htmlType="submit"/>
                </Form.Item>
            </Form>
        </section>
    );
});

export default MessageInput;