import { collection, doc, query, where } from 'firebase/firestore';
import { auth, db } from 'firebaseCore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RootStore } from 'store';

import {default as BaseCreateNewChatPage} from './CreateNewChatPage'

const CreateNewChatPage = () => {
  const [users, loading] = useCollectionData(
    query(collection(db, 'users'), where('uid', "!=", auth.currentUser.uid))
  );

  const createChatFunc = (user) => {
    const dialog = {
      lastMessage: '',
      isGroup: false,
      partners: [user.uid, auth.currentUser.uid],
      channels: [],
      unreads: {
        [user.uid]: 0,
        [auth.currentUser.uid]: 0
      }
    }
    RootStore.dialogsStore.createNewChat(dialog, auth.currentUser.uid, user.uid)
  }

  return (
      <BaseCreateNewChatPage users={users} createChatFunc={createChatFunc}/>
  );
};

export default observer(CreateNewChatPage);