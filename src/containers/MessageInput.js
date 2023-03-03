import React from 'react';

import { MessageInput as BaseMessageInput } from 'components';
import { DialogsStore } from 'store';
import { observer } from 'mobx-react';

const MessageInput = observer(({ resizeFunc }) => {

    const onFinishFunc = (values, form) => {
        DialogsStore.postMessage({type: 'text', ...values})
    }

    return (
        <BaseMessageInput resizeFunc={resizeFunc} onFinishFunc={onFinishFunc}/>
    );
});

export default MessageInput;