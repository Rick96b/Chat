import { MessagesBlock } from "components";

const SeparateMessagesOnBlocks = (messages) => {
    let resultArrayOfBlocks = []
    let intermediateArray = []
    messages.forEach(message => {
        if (intermediateArray[0]) {
            if (message.props.author.id === intermediateArray[0].props.author.id) {
                intermediateArray.push(message)
            } else {
                resultArrayOfBlocks.push(<MessagesBlock items={intermediateArray} />)
                intermediateArray = [message]
            }
        } else {
            intermediateArray.push(message)
        }
    });
    resultArrayOfBlocks.push(<MessagesBlock items={intermediateArray} />)
    return resultArrayOfBlocks;
}

export default SeparateMessagesOnBlocks;