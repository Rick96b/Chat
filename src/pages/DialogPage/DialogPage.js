import { DialogHeader, DialogChannels, MessagesList, MessageInput } from 'containers';
import React, { useRef } from 'react';

import styles from './DialogPage.module.scss';
import { RootStore } from 'store';
import { observer } from 'mobx-react';

const DialogPage = ({ messages }) => {
    const pageRef = useRef()
    const messageListRef = useRef();

    const inputResize = () => {
        let height = 0;
        for(let i = 0; i < pageRef.current.childNodes.length; i++) {
            if (pageRef.current.childNodes[i] !== messageListRef.current) {
                height += pageRef.current.childNodes[i].offsetHeight
            }
        }
        messageListRef.current.style.height = `${pageRef.current.offsetHeight - height}px`;
    }
    
    return (
        <div className={styles.dialogPage} ref={pageRef}>
            <DialogHeader />
            <div className={styles.messageListContainer} ref={messageListRef}>
                <MessagesList messages={messages}/>
            </div>
            {RootStore.dialogStore.currentDialog.isGroup && 
                <DialogChannels />
            }
            <MessageInput resizeFunc={inputResize.bind(this)}/>
        </div>
    );
};

export default observer(DialogPage)