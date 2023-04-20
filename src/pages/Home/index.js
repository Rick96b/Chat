import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import {default as BasePage} from './HomePage';

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