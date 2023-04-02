import { collection, getDocs} from "firebase/firestore"; 

import { db }  from 'firebaseCore'

export default async () => {
    const usersDocs = await getDocs(collection(db, 'users'));
    return usersDocs.docs.map(userDoc => userDoc.data())
}