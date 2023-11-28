import { Avatar, Button, CardHeader, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import classess from './style.module.css'
import Swal from 'sweetalert2'
import axios from 'axios';
function UpdateProfile() {
    const [user, setUser] = useState()
    const [data, setData] = useState({
        gender: '',
        birthday: '',
        fullname: '',
        introduct: ''
    })
    useEffect(()=>{
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    
    };
        axios.post('http://localhost:5000/users/update/get-user',{data: ''}, {headers: headers})
        .then(user=>{
            setUser(user.data[0])
            // console.log(user.data[0].username)
            setData({fullname: user.data[0].fullname, birthday: user.data[0].birthday, introduct: user.data[0].introduct, gender: user.data[0].gender})
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
        axios.post('http://localhost:5000/users/update',{data: data}, {headers: headers})
        .then(user=>{
            setUser(user)
            Swal.fire("Chỉnh sửa thành công!");
        })
        .catch(error=>{
            console.log(error);
        })
    },[data])
    return (
        <>
       {user && ( <div className={`${classess.update_profile} mt-5`}>
            <div>
            <Typography variant='h4'>Chỉnh Sửa Trang Cá Nhân</Typography>
            <div style={{textAlign: 'center', margin: '0 auto'}}><CardHeader className={`${classess.card}`}
                avatar={<Avatar className={`${classess.user}`}><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                title={user.username}
                subheader="Thay đổi ảnh đại diện"
              /></div>
        <label htmlFor='username'>
            <span>Tên người dùng</span>
           <input value={data.fullname|| ''} onChange={e=> setData({...data, fullname: e.target.value})}  id='username'/>
        </label>
        <label htmlFor='gt'>
            <span>Giới tính</span>
            <select onChange={e=> setData({...data, gender: e.target.value})} id='gt'>
                <option selected={data.gender == 'Nam' ? true: false} >Nam</option>
                <option selected={data.gender == 'Nữ' ? true: false}>Nữ</option>
                <option selected={data.gender == 'Khác' ? true: false}>Khác</option>
            </select>
        </label>
        <label htmlFor='birthday'>
            <span>Ngày sinh</span>
            <input value={data.birthday || ''} onChange={e=> setData({...data, birthday: e.target.value})} type='datetime-local' id='birthday'/>
        </label>
        <label htmlFor='username'>
            <span>Giới thiệu</span>
            <textarea defaultValue={data.introduct|| ''} onChange={e=> setData({...data, introduct: e.target.value})}></textarea>
        </label>
            <Button onClick={handleSubmit} style={{width: '50px'}} variant='outlined'>Lưu</Button>
            </div>
        </div>)}
        </>
    );
}

export default UpdateProfile;