import { DialogHeader, MessageInput } from 'components';
import { DialogChannels, MessagesList } from 'containers';
import React from 'react';

import styles from './DialogPage.module.scss';

const DialogPage = ({ messages }) => {
    return (
        <div className={styles.dialogPage}>
            <DialogHeader />
            <DialogChannels />
            <MessagesList messages={messages}/>
            <MessageInput />
        </div>
    );
};

export default DialogPage