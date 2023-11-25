import { Avatar, CardHeader, Modal } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import classess from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { modalSearchState$ } from '../../redux/selectors';
import axios from 'axios';
import ListUser from '../ListUser';
import { Link } from 'react-router-dom';
function Search() {
    const isOpen = useSelector(modalSearchState$);
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    console.log(isOpen);
    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',

        };
        axios.post('http://localhost:5000/users/search', { data: data }, { headers: headers })
            .then(user => {
                setUser(user)
            })
            .catch(error => {
                console.log(error);
            })
    }, [data])

    const handleUserClick = (user) => {
        <Link to={`/profile/${user}`}>{console.log('ID:', user)}</Link>
        
    };
    return (
        <div className={classess.k} style={{ display: isOpen.modalSearch.isShow ? 'block' : 'none', width: isOpen ? '400px' : '0', }}>
            <h4 style={{ fontSize: '20px', marginLeft: '30px', marginTop: '20px' }}>Tìm kiếm</h4>
            <form>
                <input onChange={e => setData(e.target.value)} placeholder='Tìm kiếm' className={`${classess.search}`} />

            </form>
            <div className={`${classess.notifi_now}`}>
                    {/* {console.log('Selected user ID:', user.data._id)} */}
                    <ListUser users={user.data} onUserClick={handleUserClick} />
            </div>
        </div>
    );
}

export default Search;