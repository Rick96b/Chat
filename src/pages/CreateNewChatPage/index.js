import { collection, doc, query, where } from 'firebase/firestore';
import { auth, db } from 'firebaseCore';
import { getCurrentUser, addChatToUser, addChatToDatabase } from 'firebaseCore/controllers';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {default as BaseCreateNewChatPage} from './CreateNewChatPage'

const CreateNewChatPage = () => {
  const [users, loading] = useCollectionData(
    query(collection(db, 'users'), where('uid', "!=", auth.currentUser.uid))
  );

  const createChatFunc = (user) => {
    const dialog = {
      lastMessage: 'aghahah',
      isGroup: false,
      partners: [doc(db, 'users', user.uid), doc(db, 'users', auth.currentUser.uid)]
    }
    addChatToDatabase(dialog).then(dialogRef => {
      addChatToUser({userUid: auth.currentUser.uid, chatRef: doc(db, 'dialogs', dialogRef.id)})
      addChatToUser({userUid: user.uid, chatRef: doc(db, 'dialogs', dialogRef.id)})
    })
  }

  return (
      <BaseCreateNewChatPage users={users} createChatFunc={createChatFunc}/>
  );
};

export default CreateNewChatPage;