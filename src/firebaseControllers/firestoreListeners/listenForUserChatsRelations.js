import { collection, onSnapshot } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default (userUid, callback) => {
    onSnapshot(collection(db, 'chatsRelations', userUid, 'dialogs'), (snapshot) => {
        callback(snapshot)
    })
}