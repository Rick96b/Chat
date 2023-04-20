import classNames from 'classnames';
import React from 'react';

import styles from './TextMessage.module.scss';

const TextMessage = ({ isMe, isGroup, date, text, author, isAdmin, isReaded}) => {
    return (
        <div className={classNames(styles.textMessage, isMe ? styles.textMessageMe : '')}>
            <div className={styles.textMessage__container}>
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
            {
                !isReaded && isMe &&
                <span className={styles.textMessage__readedIndicator} />
            }
        </div>
    );
};

export default TextMessage;