import { collection, onSnapshot } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default (dialogId, channelId, callback) => {
    onSnapshot(collection(db, 'dialogs', dialogId, 'channels', channelId, 'messages'), (snapshot) => {
        callback(snapshot)
    })
}