import { collection, addDoc, updateDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialog) => {
    return await addDoc(collection(db, 'dialogs'), dialog).then(docRef => {
        updateDoc(docRef, {id: docRef.id});
        return docRef;
    })
}