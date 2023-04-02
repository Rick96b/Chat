import { collection, setDoc, doc } from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async ({user, uid}) => {
    await setDoc(doc(db, 'users', uid), {...user, uid:uid})
}