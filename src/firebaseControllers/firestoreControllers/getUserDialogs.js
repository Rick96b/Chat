import { collection, doc, getDocs, query, where } from "firebase/firestore"; 
import { db } from "firebaseCore";

export default async (user) => {
    const dialogsRefs = query(collection(db, 'dialogs'), 
        where('partners', 'array-contains', user.uid))
    return await getDocs(dialogsRefs)
}