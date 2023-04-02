import { doc, updateDoc } from "firebase/firestore"; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { db }  from 'firebaseCore'

export default async (userWhoAddTo_uid, userWhoPostTo_uid) => {
    console.log('ahah')
    return await updateDoc(doc(db, 'usersRelations', userWhoAddTo_uid), {
        users: firebase.firestore.FieldValue.arrayUnion(userWhoPostTo_uid)
    })
}