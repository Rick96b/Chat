import { collection, onSnapshot } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default (callback) => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
        callback(snapshot)
    })
}