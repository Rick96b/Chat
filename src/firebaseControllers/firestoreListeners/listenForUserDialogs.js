import { collection, onSnapshot, query, where } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default (userUid, callback) => {
    onSnapshot(query(collection(db, 'dialogs'), 
        where('partners', 'array-contains', userUid)), async (snapshot) => {
            callback(snapshot)
    });
}