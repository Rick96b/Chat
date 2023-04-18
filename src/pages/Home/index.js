import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import {default as BasePage} from './HomePage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'firebaseCore';
import { RootStore } from 'store';

const HomePage = () => {
    const [isModalOpen, setModalOpen] = useState(false);  

    return (
        <BasePage 
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
        />
    );
};

export default observer(HomePage);