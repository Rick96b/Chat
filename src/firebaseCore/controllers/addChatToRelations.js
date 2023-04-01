import { doc, setDoc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async (userUid, dialogId) => {
    return await setDoc(doc(db, 'usersDialogsRelations', userUid, 'dialogs', dialogId), {
        isPinned: false
    })
}