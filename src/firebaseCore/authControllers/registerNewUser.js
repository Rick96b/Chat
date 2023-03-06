import {createUserWithEmailAndPassword}  from "firebase/auth"; 

import {auth} from 'firebaseCore';

export default async (userData) => {
    return await createUserWithEmailAndPassword(auth, userData.email, userData.password)
}