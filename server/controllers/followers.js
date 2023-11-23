import { FollowersModel } from '../models/FollowersModel';
import { UserModel } from '../models/UserModel';

export const search = async (req, res) => {
    try {
        const data = req.body.data
        const users = await UserModel.find({ username: { $regex: data, $options: 'i' } });
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}
export const follower = async (req, res) => {
    try {
        const users = await FollowersModel.find({ _id: req.user.id },{ password: 0 }).lean();
    
        res.status(200).json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
}