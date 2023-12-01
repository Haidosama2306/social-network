import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import posts from './routers/posts.js';
import users from './routers/users.js';
import followers from './routers/followers.js'
import messages from './routers/messages.js';
import notify from './routers/notify.js';
import auth from './routers/auth.js';
import { comments } from "./controllers/comments.js";
import {connect} from './config/index.js'
import { Server } from "socket.io";
const app = express();
import http from 'http'
import { MessageModel } from "./models/MessageModel.js";
import { NotifyModel } from "./models/NotifyModel.js";
import { UserModel } from "./models/UserModel.js";
app.set('port', 5000);

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
connect(app)

app.use('/auth',auth);
app.use('/posts', posts);
app.use('/users',users);
app.use('/followers',followers);
app.use('/messages',messages);
<<<<<<< HEAD
<<<<<<< HEAD
app.use('/comments', comments)
=======
=======
app.use('/comments', comments)
>>>>>>> f767c41302683c83aaf9298d9d35c98b1840490a
app.use('/notify',notify);
var io = new Server(http.createServer(app).listen(5001), {
    cors:{
        origin: "*"
    }
});
<<<<<<< HEAD
>>>>>>> 1d67d517bbdbab05869821ea24735ececf901275
=======

>>>>>>> f767c41302683c83aaf9298d9d35c98b1840490a
// var io2 = socket.listen(server);
io.on('connection', (socket)=>{
    socket.on('room',(data)=>{
        socket.join(data)
        console.log(data);
    })
    socket.on('send', async (data)=>{
        switch (data.typeSecond) {
            case 'messages':
                const {room, receiver_user_id, content, type, file, user_id} = data
                const message = new MessageModel({ roomID: room, receiver_user_id, content, type, user_id,file:file })
                await message.save()
                socket.to(data.roomUser).emit('message',{
                   
                    content: data.content,
                    user_id: data.user_id,
                    type: data.type,
                    file: data.file
                })
                break;
            case 'notify':
                console.log(data);
                const notify = new NotifyModel({sender_user_id: data.sender_user_id, user_id: data.user_id, type: data.type, post_id: data.post_id})
                await notify.save()
                const users = await UserModel.find({ _id:data.sender_user_id },{ password: 0 }).lean();
                socket.to(data.user_id).emit('notify',{
                   
                    name: users.name,
                    user_id: data.user_id,
                })
            break;
            default:
                break;
        }
      
    })
    socket.on('error', function (err) {
        console.log("Socket.IO Error");
        console.log(err.stack);
      });
})

