import { Avatar, CardHeader } from '@mui/material';
import React from 'react';

function ListUser({users}) {
    return (
        <div>
            {users && users.map((user,i) => {
                return(
                   
                    <CardHeader
                           avatar={<Avatar ><img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' /></Avatar>}
                           style={{width: '300px'}}
                           title={user.username}
                           />
                )
            })}
        </div>
    );
}

export default ListUser;