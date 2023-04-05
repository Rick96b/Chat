import {  onChildAdded, onChildChanged, onValue, ref } from 'firebase/database';
import { realtimeDB } from 'firebaseCore';

export default (callback) => {
    onChildAdded(ref(realtimeDB, 'status/'), (snapshot) => {
        callback(snapshot)
    })
    onChildChanged(ref(realtimeDB, 'status/'), (snapshot) => {
        callback(snapshot)
    })
}