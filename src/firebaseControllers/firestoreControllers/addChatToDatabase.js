import { doc, setDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialog, id) => {
    const ref = await setDoc(doc(db, 'dialogs', id), {...dialog, id: id})
}