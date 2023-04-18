import React from 'react';

import {default as BaseModal} from 'components/UserEditModal';
import { RootStore } from 'store';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
});


const UserEditPage = ({setEditUserValues}) => {


  return (
    <BaseModal setEditUserValues={setEditUserValues} getBase64={getBase64} initialValues={RootStore.usersStore.currentUser}/>
  )
}

export default UserEditPage;
