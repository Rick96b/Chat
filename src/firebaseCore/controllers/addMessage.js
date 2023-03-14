import { collection, addDoc, updateDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialogId, channel, message) => {
    await addDoc(collection(db, 'dialogs', dialogId, 'channels', channel, 'messages'), message).then(docRef => updateDoc(docRef, {
        id: docRef.id
    }))
}