import { doc, updateDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default async (dialogId, userUid, count) => {
    if(dialogId && userUid) {
        await updateDoc(doc(db, 'chatsRelations', userUid, 'dialogs', dialogId), {
            unreads: firebase.firestore.FieldValue.increment(count)
        }, { merge: true })
    }
}