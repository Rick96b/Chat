import React from 'react';
import { Button } from 'antd';

import styles from './AddNewChatButton.module.scss';
import AddNewMessage from 'assets/AddNewMessage.svg';


const AddNewChatButton = () => {
    return (
        <Button shape='circle' className={styles.button}>
            <img src={AddNewMessage} />
        </Button>
    );
};

export default AddNewChatButton;