import { collection, getDoc, doc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (dialogId) => {
    const fetchedData = await getDoc(doc(db, "dialogs", dialogId));
    return fetchedData.data();
}