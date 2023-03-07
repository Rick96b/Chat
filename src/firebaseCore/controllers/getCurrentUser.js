import { doc, getDoc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async ({userUid = '', userRef = ''}) => {
    if (userUid) {
        return await (await getDoc(doc(db, "users", userUid))).data();
    }
    return await (await getDoc(userRef)).data();
}