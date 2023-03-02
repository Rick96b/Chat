import { collection, getDocs } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default async () => {
    const fetchedData = await getDocs(collection(db, "dialogs"));
    const returnData = [];
    fetchedData.forEach(doc => returnData.push({...doc.data(), id:doc.id}));
    return returnData;
}