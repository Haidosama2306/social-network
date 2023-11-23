import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import styles from '../../pages/Profile/style.module.css';
import ModalFollowed from '../../components/Modal/Modal_Followed';
import ModalFollowing from '../../components/Modal/Modal_Followeing';
import ModalComment from '../../components/Modal/Modal_Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


function Profile() {

    // userID là ID profile người dùng click vào 
    // email: minh1@Mail.com
    // password: 123456
    const userId = '655b870c69c6728e386b19d6';

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
        <div className={`${styles.profile}`}>
            {/* {users && (
                <>
                    <Typography>users[0]._id: {users[0]._id}</Typography>
                    <Typography>userId: {userId}</Typography>
                </>
            )} */}
            <div className={`${styles.profile_hd}`}>
                <div className={`${styles.user}`}>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
                </div>
                <div className={`${styles.profile_hd_detail}`}>
                    <div className={`${styles.func}`}>
                        {users && (
                            <Typography variant='h3'>{users[0].username}</Typography>
                        )}
                        {/* kiểm tra nếu tồn tại users và userID trùng với user._id của người dùng thì vào trang cá nhân bản thân
                            còn không thì vào trang cá nhân của người khác */}
                        {users && userId === users[0]._id ? (
                            <Grid className={`${styles.profile_user}`}>
                                <Link to='/update/user'>
                                    <Button className={`${styles.btn_editfprofile}`} sx={{ width: 300, height: 40 }}>Chỉnh sửa trang cá nhân</Button>
                                </Link>
                                <IconButton className={`${styles.btn_moresetting}`} ><MoreHorizIcon sx={{ width: 50, height: 50 }} /></IconButton>
                            </Grid>
                        ) : (
                            <Grid className={`${styles.profile_follow}`}>
                                <Button className={`${styles.btn_follow}`} sx={{ width: 200, height: 40 }}>Theo dõi</Button>
                                <Button className={`${styles.btn_messager}`} sx={{ width: 200, height: 40 }}>Nhắn tin</Button>
                                <Button className={`${styles.btn_addfr}`} sx={{ width: 100, height: 40 }}><GroupAddIcon /></Button>
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
    );
}

export default Profile;