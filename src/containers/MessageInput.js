import React from 'react';

import { MessageInput as BaseMessageInput } from 'components';
import { DialogsStore } from 'store';
import { observer } from 'mobx-react';

const MessageInput = observer(({ resizeFunc }) => {
    const submitFunc = (values) => {
        DialogsStore.postMessage({type:'text', ...values})
    }

    return (
        <BaseMessageInput resizeFunc={resizeFunc} submitFunc={submitFunc}/>
    );
});

export default MessageInput;