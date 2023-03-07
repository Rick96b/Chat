import { collection, addDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialog) => {
    return await addDoc(collection(db, 'dialogs'), dialog)
}