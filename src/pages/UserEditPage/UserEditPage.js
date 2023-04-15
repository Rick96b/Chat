import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import styles from './UserEditPage.module.scss';
import { Button, Form, Input, Modal, Upload } from 'antd';
import { BottomNavigation } from 'components';




const UserEditPage = ({onFinish, getBase64, initialValues}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [file, setFile] = useState();

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
                <header className={styles.userEditPage__header}>
                    <div className={styles.userEditPage__headerSettings}>
                        <Link to='/userInfo' style={{textDecoration: 'none'}}>
                            <Button icon={<ArrowLeftOutlined />} className={styles.userEditPage__backButton}/>
                        </Link>
                    </div>
                    <Form 
                        name="editUser"
                        autoComplete="off"
                        onFinish={(values) => {
                            onFinish(values, file)}
                        }
                        className={styles.userEditPage__headerUserSection}
                    >
                        <div className={styles.userEditPage__headerInfoToEdit}>
                            <ImgCrop cropShape='round' rotationSlider>
                                <Upload
                                    action={(file) => setFile(file)}
                                    listType="picture-circle"
                                    onPreview={handlePreview}
                                    onRemove={() => setFile(null)}
                                    className={styles.userEditPage__headerAvatar}
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
                                    />
                                </Form.Item>
                                <Form.Item name="description" initialValue={initialValues.description}>
                                    <Input 
                                        size='large' 
                                        placeholder="О себе" 
                                        id='description'
                                        className={styles.userEditPage__input}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{marginTop: '20px'}}>
                                Сохранить
                            </Button>
                        </Form.Item>
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
                </header>
            </section>
            <BottomNavigation isProfileActive={true} />
        </>
    );
};

export default UserEditPage;