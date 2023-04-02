import { doc, getDoc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (userUid) => {
    return (await getDoc(doc(db, "users", userUid))).data();
}