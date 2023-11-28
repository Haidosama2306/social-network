import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import styles from "../Followed/style.module.css";
import ListFollowers from "../../components/ListFollowers";

function Followed() {
    const [data, setData] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',

        };
        axios.post('http://localhost:5000/followers/searchfollowed', { data: data}, { headers: headers })
            .then(user => {
                setUser(user)
            })
            .catch(error => {
                console.log(error);
            })
    }, [data])
   
    const searchHeader = (
        <div className={`${styles.searchHeader}`}>

            <div className={`${styles.text_following}`}>
                <p className={`${styles.p_following}`}>Theo dõi</p>
            </div>

            <div className={`${styles.searchField}`}>
                <SearchIcon className={`${styles.icon_searh}`}></SearchIcon>
                <input onChange={e => setData(e.target.value)} className={`${styles.input_Search}`} type="text" placeholder="Tìm kiếm"></input>
            </div>
        </div>
    );

    return (
        <div className={`${styles.Following}`}>
            <div>
                {searchHeader}
            </div>

            <div className={`${styles.content}`}>
               <ListFollowers users={user.data}></ListFollowers>
            </div>
        </div>
    );
}

export default Followed;