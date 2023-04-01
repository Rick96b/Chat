import { doc, updateDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (userId, dialogId) => {
    await updateDoc(doc(db, 'usersDialogsRelations', userId, 'dialogs', dialogId), {
        isPinned: true
    }, { merge: true })
}