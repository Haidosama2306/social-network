import { BioModel } from "../models/BioModel.js";
import { UserModel } from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {

        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getUserUpdate = async (req, res) => {
    try {
        const user = await BioModel.find({ user_id: req.user.id });
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}
export const updateUser = async (req, res) => {
    try {
        const data = req.body.data
        const data2 = { ...data, user_id: req.user.id }
        let user = ''
        const check = await BioModel.find({ user_id: req.user.id });
        if (check) {
             user = await BioModel.findOneAndUpdate({user_id: req.user.id}, data2,{new: true});
            
            }else{
                user = new BioModel(data2)
                await user.save()
            }
            res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}
export const search = async (req, res) => {
    try {
        const data = req.body.data
        const users = await UserModel.find({ username: { $regex: data, $options: 'i' } });
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}
export const getProfile = async (req, res) => {
    try {
        const users = await UserModel.find({ _id: req.user.id },{ password: 0 }).lean();
    
        res.status(200).json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
}