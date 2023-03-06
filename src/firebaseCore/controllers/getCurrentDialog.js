import { getDoc, doc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (dialogId) => {
    const fetchedDialog = await getDoc(doc(db, "dialogs", dialogId));
    return {...fetchedDialog.data(), id:fetchedDialog.id};
}