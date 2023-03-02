import { collection, getDocs } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async (dialogId, channel) => {
    const fetchedData = await getDocs(collection(db, 'dialogs', dialogId, 'channels', channel, 'messages'))
    const returnData = [];
    fetchedData.forEach(doc => returnData.push(doc.data()));
    return returnData;
}