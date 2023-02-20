import { TextMessage } from "components";

const ChooseCorrectMessageType = (message) => {
    switch(message.type) {
        case 'text':
            return <TextMessage {...message} />
            break
    }
}

export default ChooseCorrectMessageType;