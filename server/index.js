import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import posts from './routers/posts.js';
import users from './routers/users.js';
import messages from './routers/messages.js';
import auth from './routers/auth.js';
import {connect} from './config/index.js'
import { Server } from "socket.io";
const app = express();
import http from 'http'
import { MessageModel } from "./models/MessageModel.js";
app.set('port', 5000);

var io = new Server(http.createServer(app).listen(5001), {
    cors:{
        origin: "*"
    }
});
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
connect(app)

app.use('/auth',auth);
app.use('/posts', posts);
app.use('/users',users);
app.use('/messages',messages);
// var io2 = socket.listen(server);
io.on('connection', (socket)=>{
    socket.on('room',(data)=>{
        socket.join(data)
    })
    socket.on('send', async (data)=>{
        const {room, content, user_id,receiver_user_id,type,file} = data
        const message = new MessageModel({ roomID: room, receiver_user_id, content, type, user_id,file:file })
        await message.save()
        socket.to(data.room).emit('receiver',{
            room: data.room,
            content: data.content,
            user_id: data.user_id,
            receiver_user_id: data.receiver_user_id,
            type: data.type,
            file: data.file
        })
    })
    socket.on('error', function (err) {
        console.log("Socket.IO Error");
        console.log(err.stack);
      });
})

