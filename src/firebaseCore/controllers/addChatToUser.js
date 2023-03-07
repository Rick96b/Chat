import { doc, updateDoc } from "firebase/firestore"; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { db } from 'firebaseCore'

export default async ({userUid, chatRef}) => {
    return updateDoc(doc(db, "users", userUid), {
        chats: firebase.firestore.FieldValue.arrayUnion(chatRef)
    })
}