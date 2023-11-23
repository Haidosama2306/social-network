import { Avatar, CardHeader, Modal } from '@mui/material';
import React, { useCallback } from 'react';
import classess from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { modalState$ } from '../../redux/selectors';
function Notificate() {
    const  isOpen  = useSelector(modalState$);
    console.log(isOpen.modal);
    return (
        <div className={classess.k } style={{ display: isOpen.modal.isOpen ? 'block' : 'none', width: isOpen ? '400px' : '0', }}>
        <h4>Thông báo</h4>
                           <div className={`${classess.notifi_now}`}>
                           <h5 >Hôm nay</h5>
                           
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                           </div>
                           <div>
                               <hr></hr>
                           <h5>Hôm qua</h5>
                           <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                   <CardHeader
                   avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                   style={{width: '300px'}}
                   subheader="Nguyễn đã theo dõi bạn hãy theo dõi họ lại nhé ha ha ha ha ha ha ha ha hahaha ha.... "
                   />
                           </div></div>

    );
}

export default Notificate;