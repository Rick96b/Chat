import { doc, getDoc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (userUid, dialogId) => {
    return (await getDoc(doc(db, "chatsRelations", userUid, "dialogs", dialogId))).data();
}