import classNames from 'classnames';
import React from 'react';

import styles from './TextMessage.module.scss';

const TextMessage = ({ isMe, isGroup, date, text, author, isAdmin}) => {
    return (
        <div className={classNames(styles.textMessage, isMe ? styles.textMessageMe : '')}>
            {isGroup && !isMe &&
                <div className={styles.textMessage__header}>
                    <p className={styles.textMessage__authorName}>{ author.name }</p>
                    {isAdmin &&
                        <p className={styles.textMessage__admin}>admin</p>
                    }
                </div>
            }
            <p className={styles.textMessage__text}>
                { text }
            </p>
            <span className={styles.textMessage__date}>{ date }</span>
        </div>
    );
};

export default TextMessage;