import { Avatar, CardHeader, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import classess from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
import axios from 'axios';
function Notificate() {
    const  isOpen  = useSelector(modalState$);
    const [notify, setNotify] = useState([])
    useEffect(()=>{
        const bearerToken = localStorage.getItem('auth_token');
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };
        axios.post('http://localhost:5000/notify/get-notify',{},{headers: headers})
        .then(response=>{
            setNotify(response.data)
        })
    },[])
    return (
        <div className={classess.k } style={{ display: isOpen.modal.isOpen ? 'block' : 'none', width: isOpen ? '400px' : '0', }}>
        <h4>Thông báo</h4>
                           <div className={`${classess.notifi_now}`}>
                           <h5 >Hôm nay</h5>
                           {notify && notify.map((e,i)=>{
                            return(

                                <CardHeader
                                avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                                style={{width: '300px'}}
                                subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                                />
                            )
                           })}
                           </div>
                           <div>
                               <hr></hr>
                           
                           </div></div>

    );
}

export default Notificate;