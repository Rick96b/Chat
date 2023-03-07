import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialogId, message) => {
    await updateDoc(doc(db, 'dialogs', dialogId), {
        lastMessage: message.text
    })
}