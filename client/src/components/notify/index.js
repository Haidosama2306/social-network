import React from 'react';
import style from './style.module.css'
import { Avatar, Card, CardActions, CardHeader, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
function Notify({notify}) {
    console.log(notify);
    return (
        <div className={`${style.notify}`}>
            <Card >
                <CardHeader avatar={<Avatar>L</Avatar> }
                subheader={'Linh và 1000 người khác đã thích bài viết của bạn'}
                action={

                    <IconButton><Close/></IconButton>
                }
                />
            </Card>
        </div>
    );
}

export default Notify;