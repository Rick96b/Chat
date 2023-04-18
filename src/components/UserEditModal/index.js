import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Modal, Upload } from 'antd';

import styles from './UserEditModal.module.scss';

const UserEditPage = ({setEditUserValues, getBase64, initialValues}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [file, setFile] = useState(null);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
    );

    return (
        <>
            <section className={styles.userEditPage}>
                <Form 
                    name="editUser"
                    autoComplete="off"
                    className={styles.userEditPage__headerUserSection}
                >
                    <div className={styles.userEditPage__headerInfoToEdit}>
                        <ImgCrop cropShape='round' rotationSlider>
                            <Upload
                                action={(file) => {
                                    setFile(file)
                                    setEditUserValues('avatar', file)
                                }}
                                listType="picture-circle"
                                onPreview={handlePreview}
                                onRemove={() => setFile(null)}
                                className={styles.userEditPage__headerAvatar}
                                file={file}
                            >
                                {file ? null : uploadButton } 
                            </Upload>
                        </ImgCrop>
                        <div className={styles.userEditPage__headerUserInfo}>
                            <Form.Item name="login" initialValue={initialValues.login}> 
                                <Input 
                                    size='large' 
                                    placeholder="Ваше имя" 
                                    id='login'
                                    className={styles.userEditPage__input}
                                    onChange={(event) => setEditUserValues('login', event.target.value)}
                                />
                            </Form.Item>
                            <Form.Item name="description" initialValue={initialValues.description}>
                                <Input 
                                    size='large' 
                                    placeholder="О себе" 
                                    id='description'
                                    className={styles.userEditPage__input}
                                    onChange={(event) => setEditUserValues('description', event.target.value)}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                    />
                </Modal>
            </section>
        </>
    );
};

export default UserEditPage;