import { collection, getDocs } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (channelId, dialogId) => {
    let resultData = [];
    (await getDocs(collection(db, "dialogs", dialogId, "channels", channelId, 'messages'))).docs.forEach(message => {
        resultData.push(message.data())
    });
    return resultData;
}