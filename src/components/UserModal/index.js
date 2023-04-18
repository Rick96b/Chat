import { Button, Modal } from 'antd';
import { UserEditModal, UserInfoModal } from 'containers';
import React from 'react';

import styles from './UserModal.module.scss';

const UserModal = ({
    isOpen, 
    handleModalCancel, 
    handleEditUser, 
    isLoading, 
    modalContent, 
    setModalContent,
    setEditUserValues}) => {

    return (
        <Modal
          open={isOpen}
          onOk={handleEditUser}
          confirmLoading={isLoading}
          onCancel={handleModalCancel}
          centered={true}
          footer={[
            <Button key="back" onClick={modalContent == 'Info' ? handleModalCancel : () => setModalContent('Info')} className={styles.modal__footerBackButton}>
              Back
            </Button>,
            <Button key="Edit" type='primary' loading={isLoading} onClick={modalContent == 'Info' ? () => setModalContent('Edit') : () => handleEditUser()}>
              {modalContent == 'Info' ? "Edit" : "Save"}
            </Button>
          ]}
        >
          {modalContent == 'Edit'
          ?
          <UserEditModal setEditUserValues={setEditUserValues}/>
          :
          <UserInfoModal />
          }
        </Modal>
    );
};

export default UserModal;