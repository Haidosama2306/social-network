import { Avatar } from '@mui/material';
import styles from "./style.module.css";
import React from 'react';

function ListFollowers({ users}) {
    return (
        <div>
            {users && users.map((user, i) => {
                return (
                    <div className={`${styles.User}`}>
                        <Avatar
                            src={'NoAccounts'}
                            className={`${styles.avatarUser}`} />

                        <p className={`${styles.username}`}>{user.follower_username}</p>
                        <p className={`${styles.fullname}`}>#{user.follower_username}</p>
                        <button className={`${styles.btn_following}`}>Theo dõi</button>
                    </div>
                )
            })}
        </div>
    );
}

export default ListFollowers;