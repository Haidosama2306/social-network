import React, { useEffect, useState, useCallback} from "react";
import axios from "axios";
import styles from './style.module.css';
import { Avatar, Card, Grid, CardMedia } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListComments from '../../../components/ListComments';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function Comment() {
    const postID = '6562392964e89ccbe21a2877'
    const navigate = useNavigate()
    const [profile, setprofile] = useState('');
    const [postcmt, setPostcmt] = useState('')
    const [data, setData] = useState({
        post_id: postID,
        user_id: '',
        username: '',
        body: '',
    })
    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        };

        axios
            .post('http://localhost:5000/users/profile', {data: data}, { headers: headers })
            .then((res) => {
                const profile = res.data[0];
                setprofile(profile);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(()=>{

        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };
        axios.post('http://localhost:5000/comments/findcomments',{data: data}, {headers: headers})
        .then((res)=>{
            const postcmt = res.data
            // console.log('res:',res);
            setPostcmt(postcmt)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    const handleSubmit = useCallback(()=>{
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    
    };
        axios.post('http://localhost:5000/comments/insertcomments',{data: data}, {headers: headers})
        .then((res)=>{
            const postcmt2 = res.data
            setPostcmt([...postcmt, postcmt2])
            setData({...data, post_id: postID, user_id: profile._id, username: profile.username, body: postcmt.body})
            // Swal.fire("Thêm Bình luận thành công!");

            console.log('profile: ',profile);
            console.log('data: ',data);
            console.log('postcmt:',postcmt);
        })
        .catch(error=>{
            console.log(error);
        })
    },[data])

    const statusPoster = (
        <div>
            {profile && (
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
                    
                    <div className="col-md-6">
                        <a className={`${styles.namePoster}`}  onChange={e=> setData({...data, username: e.target})}>{profile.username}</a>
                    </div>
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
            )}
            <div className={`${styles.borderBottom}`}></div>
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
                <input className={`${styles.input_Content}`} type="text" onChange={e=> setData({...data, body: e.target.value})}></input>
            </div>

            <div className={`${styles.input_Submit}`}>
                <button className={`${styles.a_Submit}`} href="#" onClick={handleSubmit}>Đăng</button>
            </div>
        </div>
    );

    const defaultComment = (
        <div className={`${styles.userComment}`}>
        <div className={`${styles.User}`}>
            <div className={`${styles.userInfo}`}>
                <div className={`${styles.avatarUser}`}>
                    <Avatar
                        alt="User1"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCffxOKRLn21jLPSYrtR5knqhMJ7jWsq9EQ&usqp=CAU" />
                </div>
                {profile && (
                <div className={`${styles.nameUser}`}>
                    <p >{profile.username}</p>
                </div>
                )}
            </div>

            <div className={`${styles.commentBody}`}>
                <div className={`${styles.commentUser}`} >
                    <p >Comment ở đây nè</p>
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
    const content_Right = (
        <div className={`${styles.contentRight}`}>
            <div className={`${styles.posterSticky}`}>
                {statusPoster}
            </div>

            <div className={`${styles.content}`}>
                {/* {defaultComment} */}
                {postcmt && (
                   
                        <ListComments postcmt={postcmt}></ListComments>
                    
                )}
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