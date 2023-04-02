import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Empty } from 'antd';

import styles from './RecentDialogs.module.scss';
import RecentDialog from 'containers/RecentDialog';


const RecentDialogs = React.forwardRef(({ dialogs }, ref) => {
    return (
        <section className={classNames(styles.recentDialogs, styles.recentDialogsPinnedActive)}>
            <div ref={ref} className={styles.recentDialogs__header} >
                <h2>Recent Chats</h2>
                <SearchOutlined className={styles.recentDialogs__search}/>
            </div>
            {dialogs.length 
                ?
                <ul className={styles.recentDialogs__dialogs}>
                    {dialogs.map(dialog => 
                        <li className={styles.recentDialogs__dialog}>
                            <RecentDialog
                                dialog={dialog}
                            />
                        </li>
                    )}
                </ul>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Create your first dialog!'/>
            }
        </section>
    );
});

export default observer(RecentDialogs);