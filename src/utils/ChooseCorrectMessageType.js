import { TextMessage } from "components";

const ChooseCorrectMessageType = (message, userUid) => {
    switch(message.type) {
        case 'text':
            return <TextMessage {...message} isMe={message.author == userUid ? true : false }/>
            break
    }
}

export default ChooseCorrectMessageType;