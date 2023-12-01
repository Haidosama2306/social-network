import { Avatar } from '@mui/material';
import styles from "./style.module.css";
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ListComments({ users }) {

    return (
        <div>
            {users && users.map((user, i) => {
                return (
                    <div key={user.user_id} className={`${styles.userComment}`}>
                        <div className={`${styles.User}`}>
                            <div className={`${styles.userInfo}`}>
                                <div className={`${styles.avatarUser}`}>
                                    <Avatar
                                        alt="User1"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCffxOKRLn21jLPSYrtR5knqhMJ7jWsq9EQ&usqp=CAU" />
                                </div>

                                <div className={`${styles.nameUser}`}>
                                    <p >{users.nameUser}</p>
                                </div>
                            </div>

                            <div className={`${styles.commentBody}`}>
                                <div className={`${styles.commentUser}`} >
                                    <p>{users.body}</p>
                                </div>

                                <div className={`${styles.likeComment}`} >
                                    <FavoriteBorderIcon />
                                </div>

                                <div className={`${styles.statusUser}`}>
                                    <p>1 giờ trước</p>
                                </div>

                                <div className={`${styles.likeCount}`}>
                                    <p>1k lượt thích</p>
                                </div>

                                <div className={`${styles.reply}`}>
                                    <a className={`${styles.btnReply}`} href="#">Trả lời</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ListComments;