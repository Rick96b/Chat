import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default (dialogId, channelId, callback) => {
    const messagesQuery = query(collection(db, 'dialogs', dialogId, 'channels', channelId, 'messages'), 
    orderBy('createdAt', 'asc'))
    onSnapshot(messagesQuery, (snapshot) => {
        callback(snapshot)
    })
}