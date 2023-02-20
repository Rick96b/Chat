import React, { useState } from 'react';
import {DialogChannels as BaseDialogs} from 'components';
import { DialogsStore } from 'store';
import { observer } from 'mobx-react-lite';

import styles from 'components/DialogChannels/DialogChannels.module.scss'

const DialogChannels = () => {
    const [isOpen, setIsOpen] = useState(false);

    const changeChannel = event => {
        changeChannelView(event)
        DialogsStore.fetchChannelMessages(event.currentTarget.id);
        setIsOpen(false);
    }

    const changeChannelView = event => {
        document.getElementById(DialogsStore.activeChannel).classList.remove(styles.dialogChannels__channelSwitchButtonActive);
        event.currentTarget.classList.add(styles.dialogChannels__channelSwitchButtonActive);
        document.getElementById('currentChannel').innerHTML = `# ${event.currentTarget.id}`;
    }

    return (
        <BaseDialogs
            isOpen={isOpen}
            channelsListHandler={() => setIsOpen(!isOpen)}
            changeChannel={changeChannel}
        />
    );
};

export default observer(DialogChannels);