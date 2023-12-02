import { useCallback, useRef, useState } from "react";
import ModalCreate from "../../components/Modal/Modal_Create";
import {
  IconCreate,
  IconCreateActive,
  IconHome,
  IconHomeActive,
  IconMenu,
  IconMenuActive,
  IconMessages,
  IconMessagesActive,
  IconNofication,
  IconNoficationActive,
  IconSearch,
  IconSearchActive,
} from "../../components/icons";
import { IconInstagramLogo } from "../../components/icons/ic_instagram_logo";
import { InstagramLogo } from "../../components/images";
import NavItem from "../../components/nav_item";
import styles from "./styles.module.css";
import { MenuAvatar } from "../../components/menu_avatar";
import { hideModalNotifi, showModalNotifi } from "../../redux/actions/modal/notifi";
import { useDispatch, useSelector } from 'react-redux';
import Notificate from "../../components/Notificate";
import Search from "../../components/Search";
import { hideModalSearch, showModalSearch } from "../../redux/actions/modalSearch";
import {  useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Notify from "../../components/notify";
import { io } from "socket.io-client";
import { Close } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
// "undefined" means the URL will be computed from the `window.location` object
const URL =  'http://localhost:5001/';
const socket = io.connect(URL)
export default function SideBar({ tabActive, onClickTab }) {
const navigator = useNavigate()
  const [users, setUser] = useState('');
  const notify_alret = useRef()
  useEffect(() => {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };

    axios
      .post('http://localhost:5000/users/findprofile', {_id: localStorage.getItem('auth_user')}, { headers: headers })

      .then((res) => {
        const users = res.data;
        setUser(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const dispatch = useDispatch();
  
  const [notify, setNotify]= useState()
  const [isVisible, setIsVisible] = useState(false);
  useEffect(()=>{
    socket.emit('room', localStorage.getItem('auth_user'))
    socket.on('notify', (data)=>{
      setNotify(data)
  console.log(notify);
                notify_alret.current.style.display = 'block';

    });
  },[isVisible,notify])
  useEffect(() => {
      const timer = setTimeout(() => {
       console.log(1);
          notify_alret.current.style.display = 'none';
        
      }, 2000);
      return () => clearTimeout(timer);
    }, [isVisible, notify]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleShowModal = useCallback(()=>{
    setToggle(!toggle);
    if (toggle) {
      console.log(1);
        dispatch(showModalNotifi())

        
    }else{
        dispatch(hideModalNotifi())
    }
},[dispatch, toggle])
const handleShowModalSearch = useCallback(()=>{
  setToggleSearch(!toggleSearch);
  if (toggleSearch) {
      dispatch(showModalSearch())
      
  }else{
      dispatch(hideModalSearch())
  }
},[dispatch, toggleSearch])
const handleLogout = ()=>{
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  window.location.href='/'
}
  // Test Data
  const currentUser = {
    id: '123',
    userName: 'tungduong051',
    displayName: 'Tung Duong',
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
}

    const userAvatar = currentUser.avatar;

  return (
    <div className={`${styles.sidebar}`}>
      <div
        className={`${styles.show_logo} cursor-pointer mb-2 mt-5 px-3 pt-5 pb-4`}
      >
        <InstagramLogo />
      </div>
      <div
        className={`${styles.show_icon_logo} cursor-pointer p-3 my-4 mr-3 hover:bg-[#FAFAFA] hover:rounded-3xl`}
      >
        <IconInstagramLogo />
      </div>
      <div className={`${styles.navbar} grow`}>
        <NavItem
          icon={<IconHome />}
          activeIcon={<IconHomeActive />}
          title="Home"
          isActive={tabActive === ""}
          onClick={() => onClickTab("")}
        />
        <div className={`${styles.hide_on_mobile}`}>
          <NavItem
            icon={<IconSearch />}
            activeIcon={<IconSearchActive />}
            title="Search"
            isActive={tabActive === "search"}
            onClick={handleShowModalSearch}

          />
        </div>
        <Search/>
        <Notificate/>
        <NavItem
          icon={<IconMessages />}
          activeIcon={<IconMessagesActive />}
          isActive={tabActive === "messages"}
          title={"Messages"}
          onClick={() => onClickTab("messages")}
        />
        <div  className={`${styles.hide_on_mobile}`}>
          <NavItem
            icon={<IconNofication />}
            activeIcon={<IconNoficationActive />}
            isActive={tabActive === "notifications"}
            title={"Notifications"}
            onClick={handleShowModal}
          />
        </div>
        <div>
        <div className={`${styles.notify}`} ref={notify_alret} 
      >
            <Card >
                <CardHeader avatar={<Avatar>L</Avatar> }
                subheader={`${notify? notify.name: ''} và 1000 người khác đã thích bài viết của bạn`}
                action={

                    <IconButton><Close/></IconButton>
                }
                />
            </Card>
        </div>
    </div>
        <NavItem
          icon={<IconCreate />}
          activeIcon={<IconCreateActive />}
          isActive={tabActive === "creates"}
          title={"Creates"}
          onClick={handleOpenModal}
        />
        <ModalCreate open={isModalOpen} onClose={handleCloseModal}/>

      {users && (
        <NavItem
          icon={<MenuAvatar url={userAvatar} isActive={false} />}
          activeIcon={<MenuAvatar url={userAvatar} isActive={true} />}
          isActive={tabActive === "profile"}
          title={"Profile"}
          onClick={() => onClickTab(`/profile/${users[0]._id}`)}
        />
        )}
      </div>
      <div className={`${styles.hide_icon_more} mb-6`}>
        <NavItem
          icon={<i class="fa-solid fa-right-from-bracket"></i>}
          activeIcon={<IconMenuActive />}
          isActive={false}
          title={"Logout"}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
