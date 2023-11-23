import { currentUser } from "../../common/data/current_user";
import { listPosts } from "../../common/data/list_posts";
import { ButtonLink } from "../../components/button_link";
import { ItemRow } from "../../components/item_row";
import PostItem from "../../components/post_item";
import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomePage() {
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

  const [_user, setData] = useState([]);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const bearerToken = localStorage.getItem('auth_token');
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    };

    axios
      .get('http://localhost:5000/users', {}, { headers: headers })
      .then((res) => {
        const _user = res.data;
        setData(_user);

        const listData = [];
        _user.forEach((user) => {
          if (listData.length < 5) {
            listData.push({
              id: user._id,
              username: user.username,
              displayName: "chahcha",
              avatar: "https://randomuser.me/api/portraits/women/66.jpg",
              isFollowing: false,
              type: "Suggested for you",
            });
          }
        });

        setListData(listData);
        console.log(listData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex justify-center pb-16">
      <div className={`${styles.container_feed}`}>

        {listPosts && listPosts.map((e) => <PostItem post={e} key={e.id} />)}
      </div>
      <div className={`${styles.suggestions}`}>
        {users && (

          <ItemRow
            url={currentUser.avatar}
            title={<Link to='/profile'>{users[0].username}</Link>}
            subTitle={currentUser.displayName}
            rightItem={
              <ButtonLink textBtn="Switch" onClick={() => console.log("")} />
            }
          />

        )}
        <div className="flex flex-row justify-between">
          <p className="font-bold text-secondary-text text-[14px]">
            Suggestions For You
          </p>
          <button className="text-xs font-bold" >
            See All
          </button>
        </div>

        <div>
          {listData.map((item) => {
            return (
              <ItemRow
                key={item.id}
                url={item.avatar}
                title={item.username}
                size={34}
                rightItem={<ButtonLink textBtn="Follow" onClick={() => console.log("")} />}
                subTitleItem={
                  <p className="text-xs text-secondary-text text-ellipsis font-medium">
                    {item.type}
                  </p>
                }
              />
            )
          })}
        </div>

      </div>
    </div>
  );
}
