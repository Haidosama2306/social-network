import { Avatar } from '@mui/material';
import styles from "./style.module.css";
import React from 'react';

function ListFollowers({ users }) {
    return (
        <div>
            {users && users.map((user, i) => {
                return (
                    <div key={user._id} className={`${styles.User}`}>
                        <Avatar
                            src={'NoAccounts'}
                            className={`${styles.avatarUser}`} />

                        <p className={`${styles.username}`}>{user.username}</p>
                        <p className={`${styles.fullname}`}>#{user.username}</p>
                        <button className={`${styles.btn_follow}`}>Xóa</button>
                    </div>
                )
            })}
        </div>
    );
}

export default ListFollowers;