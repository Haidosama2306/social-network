import React, { useEffect, useState} from "react";
import axios from "axios";
import styles from './style.module.css';
import { Avatar, Card, Grid, CardMedia } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export default function Comment() {

    const [users, setUser] = useState('');

    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        };

        axios
            .post('http://localhost:5000/users/profile', {}, { headers: headers })
            .then((res) => {
                const users = res.data;
                setUser(users);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const statusPoster = (
        <div>
            <div className={`${styles.Poster}`}>
                <div className="row">
                    <div className="col-md-3">
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt="Messi"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"

                            className={`${styles.avatar_poster}`}
                        />
                    </div>
                    { users && (
                    <div className="col-md-6">
                        <p className={`${styles.namePoster}`}>{users[0].username}</p>
                    </div>
                    )}
                    <div className="col-md-2">
                        <p className={`${styles.statusPoster}`}>Online</p>
                    </div>

                    <div className="col-md-1">
                        <div className={`${styles.btnSettingPoster}`}>
                            <SettingsIcon></SettingsIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.borderBottom}`}></div>
        </div>
    );

    const statusUser = (
        <div className={`${styles.userComment}`}>
            <div className={`${styles.User}`}>
                <div className={`${styles.userInfo}`}>
                    <div className={`${styles.avatarUser}`}>
                        <Avatar
                            alt="User1"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCffxOKRLn21jLPSYrtR5knqhMJ7jWsq9EQ&usqp=CAU" />
                    </div>

                    <div className={`${styles.nameUser}`}>
                        <p >User 1</p>
                    </div>
                </div>

                <div className={`${styles.commentBody}`}>
                    <div className={`${styles.commentUser}`} >
                        <p>Comment ở đây nè</p>
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
    );

    const inputComment = (
        <div className={`${styles.inputComment}`}>
            <div className={`${styles.borderTop}`}></div>

            <div className={`${styles.input_btnLike}`}>
                <FavoriteBorderIcon sx={{ width: 40, height: 40 }}></FavoriteBorderIcon>
            </div>

            <div className={`${styles.input_btnComment}`}>
                <MapsUgcIcon sx={{ width: 40, height: 40 }}></MapsUgcIcon>
            </div>

            <div className={`${styles.input_btnShare}`}>
                <SendIcon sx={{ width: 40, height: 40 }}></SendIcon>
            </div>

            <div className={`${styles.input_btnSave}`}>
                <BookmarkBorderIcon sx={{ width: 40, height: 40 }}></BookmarkBorderIcon>
            </div>

            <div className={`${styles.input_statLikeCount}`}>
                <p className={`${styles.p_input}`}>2k lượt thích</p>
            </div>

            <div className={`${styles.input_status}`}>
                <p className={`${styles.p_input}`}>2 tiếng trước</p>
            </div>

            <div className={`${styles.input_avataComment}`}>
                <Avatar
                    sx={{ width: 50, height: 50, border: '2px solid black' }}
                    alt="User1"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCffxOKRLn21jLPSYrtR5knqhMJ7jWsq9EQ&usqp=CAU" />
            </div>

            <div className={`${styles.input_commentContent}`}>
                <input className={`${styles.input_Content}`} type="text" ></input>
            </div>

            <div className={`${styles.input_Submit}`}>
                <a className={`${styles.a_Submit}`} href="#">Đăng</a>
            </div>
        </div>
    );

    const content_Right = (
        <div className={`${styles.contentRight}`}>
            <div className={`${styles.posterSticky}`}>
                {statusPoster}
            </div>

            <div className={`${styles.content}`}>
                {statusUser}{statusUser}
                {statusUser}{statusUser}
                {statusUser}{statusUser}
                {statusUser}{statusUser}
                {statusUser}{statusUser}
                {statusUser}{statusUser}
            </div>

            <div className={`${styles.inputSticky}`}>
                {inputComment}
            </div>
        </div>
    );

    const content_Left = (
        <CardMedia
            image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCffxOKRLn21jLPSYrtR5knqhMJ7jWsq9EQ&usqp=CAU'}
            title="Content-comment-img"
            className={`${styles.img_post}`}
        />
    );
    return (
        <div>
            <Card variant="outlined" spacing={2} className={`${styles.content_post}`}>
                <Grid container spacing={0}>

                    <Grid item md={7}>
                        {content_Left}
                    </Grid>

                    <Grid item md={5}>
                        {content_Right}
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}