import { onDisconnect, onValue, ref, set } from 'firebase/database';
import { realtimeDB } from 'firebaseCore';


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const presenceHandler = (uid) => {
    if(uid) {
        const userStatusDatabaseRef = ref(realtimeDB, 'status/' + uid);
        
        const isOffline = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };    
        
        const isOnline = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
        
        onValue(ref(realtimeDB, '.info/connected'), function() {
            onDisconnect(userStatusDatabaseRef).set(isOffline).then(function() {
                set(userStatusDatabaseRef, isOnline);
            });
        });
    }
}

export default presenceHandler;