import { Avatar } from '@mui/material';
import styles from "./style.module.css";
import React from 'react';

function ListFollowers({ users }) {

    return (
        <div>
            {users && users.map((user, i) => {
                return (
                    <div key={user.user_id} className={`${styles.User}`}>
                        <Avatar
                            src={'NoAccounts'}
                            className={`${styles.avatarUser}`} />

                        <p className={`${styles.username}`}>{user.follower_username}</p>
                        <p className={`${styles.fullname}`}>#{user.follower_username}</p>
                        <button className={`${styles.btn_following}`}>{user.type}</button>

                    </div>
                )
            })}
        </div>
    );
}

export default ListFollowers;