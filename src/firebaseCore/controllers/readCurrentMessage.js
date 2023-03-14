import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialogId, channel, messageId, userId) => {
    await updateDoc(doc(db, 'dialogs', dialogId, 'channels', channel, 'messages', messageId), {
        [`readed.${userId}`]: true
    })
}