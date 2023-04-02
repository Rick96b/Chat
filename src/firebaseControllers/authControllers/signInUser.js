import {signInWithEmailAndPassword}  from "firebase/auth"; 

import {auth} from 'firebaseCore';

export default async (userData) => {
    return await signInWithEmailAndPassword(auth, userData.email, userData.password)
}