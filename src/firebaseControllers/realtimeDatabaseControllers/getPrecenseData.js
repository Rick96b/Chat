import {  get, ref } from 'firebase/database';
import { realtimeDB } from 'firebaseCore';

export default async (userUid) => {
    return (await get(ref(realtimeDB, `status/${userUid}`))).val()
}