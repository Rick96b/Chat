import { collection, getDocs, getDoc } from "firebase/firestore"; 

import { db } from 'firebaseCore'
import { auth } from "firebaseCore";
import { UsersStore } from "store";

export default async (chats) => {
    if(chats && chats.length) {
        let returnData = [];
        const getChatDataPromises = chats.map(async(chat) => {
            const chatDoc = await getDoc(chat)
            return {...chatDoc.data(), id:chatDoc.id};
        })
        await Promise.all(getChatDataPromises).then(values => returnData = values);
        return returnData;
    }
    return []
}