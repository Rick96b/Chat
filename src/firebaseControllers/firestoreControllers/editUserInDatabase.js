import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (userUid, values) => {
    await updateDoc(doc(db, 'users', userUid), values, {merge: true})
}