import { doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


import { db }  from 'firebaseCore'

export default async (dialogId, channelId) => {
    await updateDoc(doc(db, 'dialogs', dialogId), {
        channels: firebase.firestore.FieldValue.arrayRemove(channelId)
    })
    return await deleteDoc(doc(db, 'dialogs', dialogId, 'channels', channelId))
}