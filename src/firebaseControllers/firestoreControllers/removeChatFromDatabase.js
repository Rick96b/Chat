import { doc, deleteDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (dialogId) => {
    return await deleteDoc(doc(db, 'dialogs', dialogId))
}