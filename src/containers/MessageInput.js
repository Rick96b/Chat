import React from 'react';

import { MessageInput as BaseMessageInput } from 'components';
import { DialogsStore } from 'store';
import { observer } from 'mobx-react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { UsersStore } from 'store';


const MessageInput = observer(({ resizeFunc }) => {

    const onFinishFunc = (values) => {
        DialogsStore.postMessage({
            type: 'text', 
            author: UsersStore.currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...values})
    }

    return (
        <BaseMessageInput resizeFunc={resizeFunc} onFinishFunc={onFinishFunc}/>
    );
});

export default MessageInput;