import { NotifyModel } from "../models/NotifyModel.js"

export const getNotify = async (req, res)=>{
    try{
    const getNotify = await NotifyModel.find({user_id: req.user.id});
    console.log('notifi:',req.user);
    return res.status(200).json(getNotify);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
export const createNotify = async (req, res)=>{
    try {
        const notify= new NotifyModel({sender_user_id: req.body.sender_user_id, user_id: req.body.user_id, type: req.body.type})
        await notify.save();

    } catch (error) {
        res.status(500).json({ error: err });
        
    }
}