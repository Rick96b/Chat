import { doc, updateDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default async (dialogId, userUid, count) => {
    if(dialogId && userUid) {
        await updateDoc(doc(db, 'dialogs', dialogId), {
            [`unreads.${userUid}`]: firebase.firestore.FieldValue.increment(count)
        })
    }
}