import React from 'react';

import { MessageInput as BaseMessageInput } from 'components';
import { RootStore } from 'store';
import { observer } from 'mobx-react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const MessageInput = observer(({ resizeFunc }) => {

    const onFinishFunc = (values) => {
        RootStore.dialogStore.postMessage({
            type: 'text', 
            author: RootStore.usersStore.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...values})
    }

    return (
        <BaseMessageInput resizeFunc={resizeFunc} onFinishFunc={onFinishFunc}/>
    );
});

export default MessageInput;