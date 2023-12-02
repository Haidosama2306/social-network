import { Avatar, Button, CardHeader, Grid, IconButton, Typography, CardActions, Input, InputAdornment } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classess from './style.module.css'
import axios from 'axios';
import { MoodRounded } from '@mui/icons-material';
import * as actions from '../../redux/actions/message';
import { useDispatch, useSelector } from 'react-redux';
import { messageState$, usersMessageState$ } from '../../redux/selectors';
// import { useParams } from 'react-router-dom';
import Picker from "emoji-picker-react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileBase64 from 'react-file-base64';
import ListMessage from '../../components/ListMessage';
import  io  from 'socket.io-client';
import Swal from 'sweetalert2'
const URL =  'http://localhost:5001/';
const socket = io.connect(URL)
function MessagesPage() {
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

    const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const [type, setType] = useState('text')
  const [room, setRoom] = useState('')
  const [chooseUser, setChooseUser] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [file, setFile] = useState()
  const messages = useSelector(messageState$);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth",block: "end", inline: "nearest" })
    console.log(1);
  }
  useEffect(() => {
    scrollToBottom()
  }, [chooseUser]);
  useEffect(() => {
    socket.emit('room', localStorage.getItem('auth_user'))
    socket.on('message', (data) => {
      console.log(data);
      dispatch(actions.createMessage.createMessageSuccess(data));
    });
  }, [dispatch]);
  

  const handleSubmit = useCallback(() => {
    const data = {
      roomUser: chooseUser,
      room: localStorage.getItem('room'),
      content: content, 
      file: file, 
      user_id: localStorage.getItem('auth_user'),
      receiver_user_id: chooseUser,
      type: type,
      msg: localStorage.getItem('auth_user'),
      typeSecond: 'messages'
    }
    // console.log(data);
    socket.emit('send', data)
    dispatch(actions.createMessage.createMessageSuccess(data))
    setContent('')
  }, [content, dispatch,type, chooseUser])
  const onEmojiClick = (event, emojiObject) => {
    setContent((prevInput) => prevInput + event.emoji);
    setShowPicker(false);

  };
  useEffect(()=>{
    window.history.pushState({path: 'messages'}, '', '/messages/'+chooseUser);
    document.querySelector(`.${classess.comment}`).value = ''
    dispatch(actions.getUsersMessage.getUsersMessageRequest())
    dispatch(actions.getMessages.getMessageRequest({receiver_user_id: chooseUser}))
    socket.emit('room', chooseUser)
  },[chooseUser, dispatch, room])
  const handleShowChooseFile = useCallback(() => {
    document.querySelector('#chooseFile > input').click()
  },[chooseUser])
  const handleFilebase64 = (e)=>{
   
    const data = {
      room: localStorage.getItem('room'),
      content: e.name, 
      file: e.base64, 
      user_id: localStorage.getItem('auth_user'),
      receiver_user_id: chooseUser,
      type: e.type,
      msg: localStorage.getItem('auth_user')
    }
    socket.emit('send', data)
    dispatch(actions.createMessage.createMessageSuccess(data))
    
  }
   const handleInput = (e) => {
    const newText = e.target.value;
    const replacedText = replaceEmojis(newText);
    setContent(replacedText);
  };
  const replaceEmojis = (text) => {
    const emojiMap = {
      ':\\/': '🫤',
      ':\\4': '👍',
      ':\\P': '😝',
      ':\\)': '😊',
      ':\\(': '☹️',
      ':\\D': '😄',
      
    };

    let replacedText = text;
    for (const [emojiKey, emojiValue] of Object.entries(emojiMap)) {
      replacedText = replacedText.replace(new RegExp(emojiKey, 'g'), emojiValue);
    }

    return replacedText;
  };
  const handleDelete = ()=>{
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Xóa `
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        };
        axios.post('http://localhost:5000/messages/delete',{data: localStorage.getItem('room')},{headers: headers})
        .then(e=>{
          Swal.fire("Saved!", "", "success");
          
        })
        .catch(e=>{
          Swal.fire('Error')
        })
      }
    });
  }
  return (
    <Grid container style={{ flexDirection: 'row-reverse' }} spacing={3}>
      <Grid item xs={2.5} className={`${classess.box_message}`} >
        <CardHeader className={`${classess.user_message}`}

          title="Chi Tiết"
        />
        <Button onClick={handleDelete} variant='outlined' style={{position: 'absolute', bottom: '20px', transform:' translate(40%, 10px)'}}>Xóa Tất Cả Tin Nhắn</Button>
      </Grid>
      <Grid item sx={{ borderRight: 1, borderLeft: 1 }} className={`${classess.box_message}`} xs={5}>
        {users && (
        <CardHeader className={`${classess.user_message}`}
          avatar={<Avatar className={`${classess.user}`}><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
          title={users[0].username}
        />
        )}
        <div className={`${classess.main_user}`}>
          <Avatar className={`${classess.main_user_avt}`}><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>
          <h4>Linh</h4>
          <Typography variant='h6' color='textSecond'>@linh</Typography>
          <Button color='info'>Xem Trang Cá Nhân</Button>
        </div>   
<div >
<ListMessage ref={messagesEndRef} messages={messages.data} chooseUser={chooseUser}></ListMessage>
  </div>     
        <CardActions className='pb-4'>
          <div style={{ position: 'absolute', top: '220px' }}>
            {showPicker && (
              <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
            )}
          </div>
          <IconButton  >
            <MoodRounded onClick={() => setShowPicker(value => !value)}></MoodRounded>
          </IconButton>
          <input className={`${classess.comment}`} value={content} onChange={handleInput} placeholder='Nhập tin nhắn của bạn' />

          <div style={{ display: 'none' }} id='chooseFile'>

            <FileBase64 value={file} onDone={handleFilebase64}></FileBase64>
          </div>
          <IconButton onClick={handleShowChooseFile} type='file' aria-label="upload">
            <AttachFileIcon type='file'></AttachFileIcon>
          </IconButton>


          <Button onClick={handleSubmit}>Gửi</Button>
        </CardActions>
      </Grid>
      
      <Grid item xs={2.8} sx={{ p: 2 }} height={'100%'} borderLeft={'1px soild #000'}>
        {users && (
          <h3 className='py-4'>{users[0].username}</h3>
        )}
        <h4>Tin nhắn</h4>

        <div style={{    maxHeight: '500px',
    overflow: 'auto'}}>
        {messages.users.users && messages.users.users.map((e, i)=>{
          const check = e._id != localStorage.getItem('auth_user')
            return( 
              (check ? <div title={e._id} key={i} onClick={(e)=>setChooseUser(e.currentTarget.title)}>
              <CardHeader
                avatar={<Avatar className={`${classess.user}`}><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                title={e.username}
                subheader="Bạn: hello. 15 phút"
              />
              </div>: '')
             
          )
        })}
        </div>

      </Grid>
    </Grid>
  );
}

export default MessagesPage;