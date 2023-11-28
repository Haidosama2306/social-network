import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'
import styles from '../../pages/Profile/style.module.css';
import ModalFollowed from '../../components/Modal/Modal_Followed';
import ModalFollowing from '../../components/Modal/Modal_Followeing';
import ModalComment from '../../components/Modal/Modal_Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Swal from 'sweetalert2'


function Profile() {
    const [user, setUser] = useState('');
    const [followed, setFollowed] = useState({
        user_id: '',
        follower_user_id: '',
        follower_username: '',
        type: '',
    });
    const [data, setData] = useState({
        user_id: '',
        follower_user_id: '',
        follower_username: '',
        type: '',
    });
    const params = useParams();
    const navigate = useNavigate()
    const userid = localStorage.getItem('auth_user')

    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        };

        axios
            .post('http://localhost:5000/users/findprofile', { _id: params.user_id, data: data }, { headers: headers })
            .then(user => {
                setUser(user.data[0]);
                setFollowed( user.data[0]);
                setData({ user_id: userid, follower_user_id: user.data[0]._id, follower_username: user.data[0].username})
            })
            .catch((error) => {
                console.error(error);
            });
        }, [params]);
        //     console.log(' ------------------------ profile ------------------------');
        //     console.log('user: ', data);
        //     console.log('followed: ',  followed);
        //     console.log(' ------------------------ profile ------------------------');

        useEffect(() => {
            const bearerToken = localStorage.getItem('auth_token');
            const headers = {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
            };
    
            axios
                .post('http://localhost:5000/followers/findfollowed', { _id: params.user_id, data: data }, { headers: headers })
                .then(user => {
                    setFollowed( user.data[0]);
                    if(params.user_id !== userid){
                        if(user.data[0] == undefined){
                            setFollowed({ user_id: userid, follower_user_id: data.follower_user_id, follower_username: data.follower_username, type: ''})
                        }else{
                            setFollowed({ user_id: userid, follower_user_id: user.data[0].follower_user_id, follower_username: user.data[0].follower_username, type: user.data[0].type})
                        }
                    }   
                })
                .catch((error) => {
                    console.error(error);
                });
            }, [params]);

            // console.log(' ------------------------ followers ------------------------');
            // console.log('user: ', data);
            // console.log('followed: ',  followed);
            // console.log(' ------------------------ followers ------------------------');

    const insertSubmit = useCallback(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
            ContentType: 'application/json',
        };
        axios.post('http://localhost:5000/followers/insertfollowed', { data: data }, { headers: headers })
            .then(user => {
                setUser(user);
                Swal.fire('Theo dõi thành công!');
                navigate(`/profile/${params.user_id}`)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [data]);

    const deleteSubmit = useCallback(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
            ContentType: 'application/json',
        };
        axios.post('http://localhost:5000/followers/deletefollowed', { data: data }, { headers: headers })
            .then(followed => {
                setUser(followed);
                Swal.fire('Đã hủy theo dõi!');
                navigate(`/profile/${params.user_id}`)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [data]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("followed");

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>

            <div className={`${styles.profile}`}>
                <div className={`${styles.profile_hd}`}>
                    <div className={`${styles.user}`}>
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                    </div>
                    <div className={`${styles.profile_hd_detail}`}>
                        <div className={`${styles.func}`}>
                            {user &&(
                                <Typography variant='h3'>{user.username}</Typography>
                            )}
                            {userid === params.user_id ? (
                                <Grid className={`${styles.profile_user}`}>
                                    <Link to='/update/user'>
                                        <Button className={`${styles.btn_editfprofile}`} sx={{ width: 300, height: 40 }}>Chỉnh sửa trang cá nhân</Button>
                                    </Link>
                                    <IconButton className={`${styles.btn_moresetting}`} ><MoreHorizIcon sx={{ width: 50, height: 50 }} /></IconButton>
                                </Grid>
                            ) : (
                                <Grid className={`${styles.profile_follow}`}>
                                    {followed && followed.type === '' ? (
                                        <Button className={`${styles.btn_follow}`} sx={{ width: 200, height: 40 }} onClick={insertSubmit}>Theo dõi</Button>
                                    ) : (
                                        <Button className={`${styles.btn_follow}`} sx={{ width: 200, height: 40 }} onClick={deleteSubmit}>Hủy Theo dõi</Button>
                                    )}
                                    <Button className={`${styles.btn_messager}`} sx={{ width: 200, height: 40 }}>Nhắn tin</Button>
                                </Grid>
                            )}

                        </div>
                        <div className={`${styles.profile_detail}`}>
                            <Button className={`${styles.span_detail}`}>
                                <span className={`${styles.span_detail_number}`}>1</span>Bài viết
                            </Button>

                            <Button className={`${styles.span_detail}`} onClick={() => handleOpenModal("followed")}>
                                <span className={`${styles.span_detail_number}`}>1</span>Người theo dõi
                            </Button>
                            <ModalFollowed open={isModalOpen && modalType === "followed"} onClose={handleCloseModal} />

                            <Button className={`${styles.span_detail}`} onClick={() => handleOpenModal("following")}>
                                Đang theo dõi <span className={`${styles.span_detail_number}`}> 1 </span> người
                            </Button>
                            <ModalFollowing open={isModalOpen && modalType === "following"} onClose={handleCloseModal} />
                        </div>
                    </div>
                </div>

                <div className={`${styles.profile_bd}`}>
                    <div className='mt-5 mb-5'>
                        <span className={`${styles.profile_posts}`}>
                            <BorderAllIcon sx={{ width: 40, height: 40 }} /><span>Bài Viết</span>
                        </span>
                        <span className={`${styles.profile_save_posts}`}>
                            <BookmarkBorderIcon sx={{ width: 40, height: 40 }} /><span>Đã Lưu</span></span>
                    </div>
                    <Grid container spacing={6}>

                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>
                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>

                        </Grid>
                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>
                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>
                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>

                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>
                        <Grid item xs={3} onClick={() => handleOpenModal("comment")}>
                            <div className='post_item'>
                                <img width='80%' src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                            </div>
                        </Grid>

                        <ModalComment open={isModalOpen && modalType === "comment"} onClose={handleCloseModal} />

                    </Grid>
                </div>
            </div>

        </div>
    );
}

export default Profile;