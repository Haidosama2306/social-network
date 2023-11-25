import { FollowersModel } from '../models/FollowersModel';
import { FollowingModel } from '../models/FollowingModel';
import { UserModel } from '../models/UserModel';

export const searchfollowed = async (req, res) => {
    try {
        const data = req.body.data
        const users = await FollowersModel.find({ username: { $regex: data, $options: 'i' } });
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}
export const searchfollowing = async (req, res) => {
    try {
        const data = req.body.data
        const users = await FollowingModel.find({ username: { $regex: data, $options: 'i' } });
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ error: err });

    }
}

export const importFollowing = async (req, res) => {
    try {
      const { following_user_id } = req.body;
      const user = await FollowingModel.findOne({ following_user_id: following_user_id });
  
      user.following_user_id.push(following_user_id);
      await user.save();
  
      res.status(200).json({ message: 'Đã theo dõi' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const deleteFollowing = async (req, res) => {
    try {
      const { following_user_id } = req.body;
      const user = await FollowingModel.findOne({ following_user_id: following_user_id });
  
      const index = user.following_user_id.indexOf(following_user_id);
      
      user.follower_user_id.splice(index, 1);
      await user.save();
  
      res.status(200).json({ message: 'Đã hủy theo dõi' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const importFollowed = async (req, res) => {
    try {
      const { follower_user_id } = req.body;
      const user = await FollowersModel.findOne({ follower_user_id: follower_user_id });
  
      user.follower_user_id.push(follower_user_id);
      await user.save();
  
      res.status(200).json({ message: 'Đã theo dõi' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const deleteFollowed = async (req, res) => {
    try {
      const { follower_user_id } = req.body;
      const user = await FollowersModel.findOne({ follower_user_id: follower_user_id });
  
      const index = user.follower_user_id.indexOf(follower_user_id);
      
      user.follower_user_id.splice(index, 1);
      await user.save();
  
      res.status(200).json({ message: 'Đã hủy theo dõi' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };