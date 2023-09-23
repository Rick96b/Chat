import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { RootStore } from 'store';

import {default as BaseCreateNewChatPage} from './CreateNewChatPage'

function findUniquePartners(dialogs, users, authUserUid) {
  const partners = new Set();
  dialogs.forEach(dialog => 
    dialog.partners.forEach(partner => partners.add(partner))
  )
  return users.filter(user => !partners.has(user.uid) &&
  user.uid != authUserUid)
}

const CreateNewChatPage = () => {
  const allUnconnectedUsers = findUniquePartners(
    RootStore.dialogsStore.dialogs,
    RootStore.usersStore.allUsers,
    RootStore.usersStore.currentUser.uid
  );
  const [users, setUsers] = useState(allUnconnectedUsers);


  const searchFunc = (searchValue) => {
    setUsers(allUnconnectedUsers.filter(user => user.login.includes(searchValue)));
  }

  const createChatFunc = (user) => {
    const dialog = {
      lastMessage: '',
      isGroup: false,
      partners: [user.uid, RootStore.usersStore.currentUser.uid],
      channels: ['General'],
    }
    RootStore.dialogsStore.createNewChat(dialog, RootStore.usersStore.currentUser.uid, user.uid)
  }
  console.log(users)
  return (
      <BaseCreateNewChatPage users={users} createChatFunc={createChatFunc} searchFunc={searchFunc}/>
  );
};

export default observer(CreateNewChatPage);