import { doc, deleteDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (userUid, dialogId) => {
    return await deleteDoc(doc(db, 'chatsRelations', userUid, 'dialogs', dialogId))
}