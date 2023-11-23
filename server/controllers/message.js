
import { MessageModel } from '../models/MessageModel.js';
import { RoomChat } from '../models/RoomChat.js';
import { UserModel } from '../models/UserModel.js';
async function getOrCreateConversation(user1Id, user2Id) {
    const existingConversation = await RoomChat.findOne({
      members: { $all: [user1Id, user2Id] }
    });
    if (existingConversation) {
        return existingConversation._id;
    } else {
        const newConversation = new RoomChat({
            members: [user1Id, user2Id],
        });
        await newConversation.save();
      return newConversation._id;
    }
  }

// Hàm để xử lý tạo mới và bắt đầu WebSocket server
export const create = async (req, res) => {
    try {
        const roomID = await getOrCreateConversation(req.body.receiver_user_id, req.user.id);
        const user_id = req.user.id
        const receiver_user_id= req.body.receiver_user_id
        const content = req.body.content
        const message = new MessageModel({user_id,receiver_user_id,content,roomID})
        const mess = await message.save()
        res.status(200).json({ message: mess });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
export const getUsers = async (req, res)=>{
try {
    const users = await UserModel.find({}, { password: 0 }).lean();
    res.status(200).json({ users: users });

} catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    
}
}

export const getMessage = async (req, res)=>{

    try {
        console.log(req.body);
    const conversationId = await getOrCreateConversation(req.body.data.receiver_user_id, req.user.id);

    const messages = await MessageModel.find({ roomID:conversationId }).sort({ timestamp: 1 });

    return res.status(200).json({ messages, room: conversationId})
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn:', req.body);
  } 
    }