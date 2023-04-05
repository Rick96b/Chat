import { Avatar, Empty } from 'antd';
import PinnedDialog from 'containers/PinnedDialog';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PinnedDialogs.module.scss';


const PinnedDialogs = React.forwardRef(({ dialogs }, ref) => {
    return (
        <section className={styles.pinnedDialogs}>
                <div className={styles.pinnedDialogs__header}>
                    <h2>Pinned Chats</h2>
                    <Avatar className={styles.pinnedDialogs__avatar} />
                </div>
                <div className={styles.pinnedDialogs__contentContainer}>
                    {dialogs.length
                        ? 
                        <ul ref={ref} className={styles.pinnedDialogs__content}>
                            {dialogs.map(dialog => 
                                <li className={styles.pinnedDialog}>
                                    <Link to={`dialog/${dialog.id}`} style={{ textDecoration: 'none' }}>
                                        <PinnedDialog 
                                            dialog={dialog}
                                        />
                                    </Link>
                                </li>
                            )}
                        </ul>
                        : 
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Pin up your first dialog!'/>
                    }
                </div>
        </section>
    );
});

export default observer(PinnedDialogs);