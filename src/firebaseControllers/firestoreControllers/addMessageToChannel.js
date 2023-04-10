import { doc, setDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'
import { generateUniqueUUID } from "utils";

export default async (dialogId, channel, message) => {
    const id = generateUniqueUUID();
    await setDoc(doc(db, 'dialogs', dialogId, 'channels', channel, 'messages', id), 
    {...message, id: id})
}