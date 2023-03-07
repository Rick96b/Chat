import React from 'react';
import { Button } from 'antd';

import styles from './AddNewChatButton.module.scss';
import AddNewMessage from 'assets/AddNewMessage.svg';
import { Link } from 'react-router-dom';


const AddNewChatButton = () => {
    return (
        <Link to='createChat'>
            <Button shape='circle' className={styles.button}>
                <img src={AddNewMessage} />
            </Button>
        </Link>
    );
};

export default AddNewChatButton;