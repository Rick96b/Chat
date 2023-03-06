import { doc } from "firebase/firestore"; 

import { db } from 'firebaseCore'

export default () => {
    return doc(db, "dialogs", 'General');
}