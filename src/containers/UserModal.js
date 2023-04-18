import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { UserModal as BaseModal } from 'components';
import { storage } from 'firebaseCore';
import { RootStore } from 'store';

const UserModal = ({isOpen, setOpen}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalContent, setModalContent] = useState('Info');
    const [editUserValues, setEditUserValues] = useState({});

    const handleModalCancel = () => {
        setOpen(false);
    };

    const handleEditUser = () => {
        setConfirmLoading(true);
        if(editUserValues.avatar) {
            uploadFile(editUserValues.avatar).then(() => {
                getDownloadURL(ref(storage, `avatars/${editUserValues.avatar.name}`)).then((url) => {
                    RootStore.usersStore.editUser({...editUserValues, avatar: url})
                    setConfirmLoading(false);
                    setModalContent('Info');
                    setOpen(false);
                })
            })
        } else {
            RootStore.usersStore.editUser({...editUserValues});
            setConfirmLoading(false);
            setModalContent('Info');
            setOpen(false);
        }
    }

    const uploadFile = (file) => {
        const avatarsRef = ref(storage, `avatars/${file.name}`)
        return uploadBytes(avatarsRef, file)
    }

    const changeUserEditValues = (inputName, newValue) => {
        setEditUserValues({...editUserValues, [inputName]: newValue})
    }

    return (
        <BaseModal
            isOpen={isOpen}
            handleModalCancel={handleModalCancel}
            handleEditUser={handleEditUser}
            modalContent={modalContent}
            isLoading={confirmLoading}
            setModalContent={setModalContent}
            setEditUserValues={changeUserEditValues}
        />
    );
};

export default UserModal;