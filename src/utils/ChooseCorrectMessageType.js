import { TextMessage } from "components";

const ChooseCorrectMessageType = (message, userUid) => {
    switch(message.type) {
        case 'text':
            return <TextMessage {...message}/>
            break
    }
}

export default ChooseCorrectMessageType;