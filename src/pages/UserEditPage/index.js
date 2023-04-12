import React from 'react';

import {default as BasePage} from './UserEditPage';
import { RootStore } from 'store';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'firebaseCore';


const uploadFile = (file) => {
  const refer = ref(storage, `avatars/${file.name}`)
  return uploadBytes(refer, file)
}

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
});


const UserEditPage = () => {

  const onFinish = (values, file) => {
    uploadFile(file).then(() => {
      getDownloadURL(ref(storage, `avatars/${file.name}`)).then((url) => {
        RootStore.usersStore.editUser({...values, avatar: url})
      })
    })
  }

  return (
    <BasePage onFinish={onFinish} getBase64={getBase64} initialValues={RootStore.usersStore.currentUser}/>
  )
}

export default UserEditPage
