import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 
import { db } from "firebaseCore";

export default async (user) => {
    const dialogsRefs = await getDocs(query(collection(db, 'usersDialogsRelations', user.uid, 'dialogs'), 
        where('isPinned', '==', true)))
    const dialogsDocsPromises = dialogsRefs.docs.map(async(dialogRef) => {
        return (await getDoc(doc(db, 'dialogs', dialogRef.id))).data()
    })
    return await Promise.all(dialogsDocsPromises)
}