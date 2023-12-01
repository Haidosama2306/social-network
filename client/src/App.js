// import { useDispatch } from 'react-redux';
import { Navigate, RouterProvider, useNavigate, useNavigation } from 'react-router-dom';
import './App.css';
import  {router}  from './router/index';
import  {routerauth}  from './router/routeauth';

import * as actions from './redux/actions/message';
import  io  from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageState$ } from './redux/selectors';

import Login from './auth/Login';
import axios from 'axios';
import Notify from './components/notify';
// "undefined" means the URL will be computed from the `window.location` object
const URL =  'http://localhost:5001/';
const socket = io.connect(URL)
// const [isConnected, setIsConnected] = useState(socket.connected);
//   socket.emit('mess',"a")

function App() {
  const [isLogin, setLogin]=useState(false)
  const [notify, setNotify]= useState()
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(()=>{
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json',

};
    axios.post('http://localhost:5000/auth/checkLogin',{}, {headers: headers})
    .then((check)=>{
      console.log(check);
      setLogin(true)
    })
    .catch(()=>{
      setLogin(false)
    })
    console.log(isLogin);
    if (!isLogin) {
    }
  },[isLogin])
  // const dispatch =useDispatch()
  // const messages = useSelector(messageState$);
  useEffect(()=>{
    socket.emit('room', localStorage.getItem('auth_user'))
    socket.on('notify', (data)=>{
      setNotify(data)
    });
  })
  return (
    <div>
      <div>
      {isVisible && <Notify notify={notify} />}
    </div>
      <RouterProvider router={isLogin? router : routerauth} />
    </div>
  );
}

export default App;
