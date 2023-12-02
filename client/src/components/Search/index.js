import React, { useEffect, useState } from 'react';
import classess from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalSearchState$ } from '../../redux/selectors';
import axios from 'axios';
import ListUser from '../ListUser';
import { Link, useNavigate } from 'react-router-dom';
function Search() {
    const isOpen = useSelector(modalSearchState$);
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const bearerToken = localStorage.getItem('auth_token');
        const headers = {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',

function Search() {
  const isOpen = useSelector(modalSearchState$);
  const [data, setData] = useState('');
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };
    const dataPage = { name: data, page: page +1  };
    console.log(page);
    axios.post('http://localhost:5000/users/search', { data: dataPage }, { headers: headers })
      .then(response => {
        const newUser = response.data || []; 
        console.log(newUser);
        console.log(page);
        if (page !=0) {
            
            setUser(prevUser => [...prevUser, ...newUser]); // Spread giá trị mới vào mảng
        }else{
        setUser(newUser)

        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [data, page]);

  const handleUserClick = (user) => {
    navigate(`/profile/${user}`);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className={classess.k} style={{ display: isOpen.modalSearch.isShow ? 'block' : 'none', width: isOpen ? '400px' : '0', }}>
      <h4 style={{ fontSize: '20px', marginLeft: '30px', marginTop: '20px' }}>Tìm kiếm</h4>
      <form>
        <input onChange={e => setData(e.target.value)} placeholder='Tìm kiếm' className={`${classess.search}`} />
      </form>
      <div className={`${classess.notifi_now}`} onScroll={handleScroll}>
        <ListUser users={user} onUserClick={handleUserClick} />
      </div>
    </div>
  );
}

export default Search;
