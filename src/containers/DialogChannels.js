import React, { useState } from 'react';
import {DialogChannels as BaseChannels} from 'components';
import { RootStore } from 'store';
import { observer } from 'mobx-react';

import styles from 'components/DialogChannels/DialogChannels.module.scss'

const DialogChannels = () => {
    const [isOpen, setIsOpen] = useState(false);

    const changeChannel = event => {
        changeChannelView(event)
        RootStore.dialogsStore.setActiveChannel(event.currentTarget.id);
        setIsOpen(false);
    }

    const changeChannelView = event => {
        document.getElementById(RootStore.dialogsStore.activeChannel).classList.remove(styles.dialogChannels__channelSwitchButtonActive);
        event.currentTarget.classList.add(styles.dialogChannels__channelSwitchButtonActive);
    }

    return (
        <BaseChannels
            isOpen={isOpen}
            channelsListHandler={() => setIsOpen(!isOpen)}
            changeChannel={changeChannel}
            activeChannel={RootStore.dialogsStore.activeChannel}
        />
    );
};

export default observer(DialogChannels);