import { collection, doc, query, where } from 'firebase/firestore';
import { auth, db } from 'firebaseCore';
import { addChatToDatabase } from 'firebaseCore/controllers';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { DialogsStore } from 'store';

import {default as BaseCreateNewChatPage} from './CreateNewChatPage'

const CreateNewChatPage = () => {
  const [users, loading] = useCollectionData(
    query(collection(db, 'users'), where('uid', "!=", auth.currentUser.uid))
  );

  const createChatFunc = (user) => {
    const dialog = {
      lastMessage: '',
      isGroup: false,
      partners: [doc(db, 'users', user.uid), doc(db, 'users', auth.currentUser.uid)],
      unreads: {
        [user.uid]: 0,
        [auth.currentUser.uid]: 0
      }
    }
    DialogsStore.createNewChat(dialog)
  }

  return (
      <BaseCreateNewChatPage users={users} createChatFunc={createChatFunc}/>
  );
};

export default CreateNewChatPage;