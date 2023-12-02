import React from 'react';
import style from './style.module.css'
import { Avatar, Card, CardActions, CardHeader, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
function Notify({notify}) {
    console.log(notify);
    return (
        <div className={`${style.notify}`} id='notify_alret'>
            <Card >
                <CardHeader avatar={<Avatar>L</Avatar> }
                subheader={`${notify? notify[0]?.username: ''} đã thích bài viết của bạn`}
                action={

                    <IconButton><Close/></IconButton>
                }
                />
            </Card>
        </div>
    );
}

export default Notify;