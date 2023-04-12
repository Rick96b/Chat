import React from 'react';
import { observer } from 'mobx-react-lite';

import {default as BasePage} from './HomePage';

const HomePage = () => {
    return (
        <BasePage />
    );
};

export default observer(HomePage);