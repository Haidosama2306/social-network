import { useCallback, useState } from "react";
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

export default function SideBar({ tabActive, onClickTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleShowModal = useCallback(()=>{
    setToggle(!toggle);
    if (toggle) {
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
          <Notificate/>
        <NavItem
          icon={<IconCreate />}
          activeIcon={<IconCreateActive />}
          isActive={tabActive === "creates"}
          title={"Creates"}
          onClick={handleOpenModal}
        />
        <ModalCreate open={isModalOpen} onClose={handleCloseModal}/>

        <NavItem
          icon={<MenuAvatar url={userAvatar} isActive={false} />}
          activeIcon={<MenuAvatar url={userAvatar} isActive={true} />}
          isActive={tabActive === "profile"}
          title={"Profile"}
          onClick={() => onClickTab("profile")}
        />
      </div>
      <div className={`${styles.hide_icon_more} mb-6`}>
        <NavItem
          icon={<IconMenu />}
          activeIcon={<IconMenuActive />}
          isActive={false}
          title={"More"}
          onClick={() => console.log("")}
        />
      </div>
    </div>
  );
}
