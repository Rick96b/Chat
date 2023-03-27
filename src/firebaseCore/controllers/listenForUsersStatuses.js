import { onDisconnect, onValue, ref, set } from 'firebase/database';
import { realtimeDB } from 'firebaseCore';

export default (callback) => {
    onValue(ref(realtimeDB, 'status/'), (snapshot) => {
        let resultData = [];
        snapshot.forEach(childSnapshot => {
            resultData.push({uid:childSnapshot.key, ...childSnapshot.val()})
        })
        callback(resultData)
    })
}