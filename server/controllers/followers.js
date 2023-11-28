import { FollowersModel } from '../models/FollowersModel.js';
import { FollowingModel } from '../models/FollowingModel.js';


export const followed = async (req, res) => {
  try {
    const users = await FollowersModel.find();
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}


export const findFollowed = async (req, res) => {
  try {

      const data = req.body.data
      const user = await FollowersModel.find({follower_user_id: data.follower_user_id});
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err });

  }
}
export const searchfollowed = async (req, res) => {
  try {
    const data = req.body.data
    const users = await FollowersModel.find({follower_username: { $regex: data, $options: 'i' } });
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}
export const insertFollowed = async (req, res) => {
  try {
    const data = req.body.data

    const check  = await FollowersModel.findOne({ user_id: req.user.id, follower_user_id: data.follower_user_id});
    if(!check){
      const newFollowed = new FollowersModel({
        user_id:  req.user.id,
        follower_user_id: data.follower_user_id,
        follower_username: data.follower_username,
        type: 'Theo dõi'
      })
      await newFollowed.save()
      res.status(200).json(newFollowed);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFollowed = async (req, res) => {
  try {
    const data = req.body.data

    const check  = await FollowersModel.findOne({ user_id: req.user.id, follower_user_id: data.follower_user_id});
    if(check){
      await FollowersModel.deleteOne({
        user_id: req.user.id,
        follower_user_id: data.follower_user_id,
      });
      res.status(200).json({ message: 'Đã hủy theo dõi' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const following = async (req, res) => {
  try {
    const users = await FollowingModel.find();
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}

export const findFollowing= async (req, res) => {
  try {

      const data = req.body.data
      const user = await FollowingModel.find({follower_user_id: data.follower_user_id});
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err });

  }
}
export const searchfollowing= async (req, res) => {
  try {
    const data = req.body.data
    const users = await FollowingModel.find({following_username: { $regex: data, $options: 'i' } });
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}
export const insertFollowing= async (req, res) => {
  try {
    const data = req.body.data

    const check  = await FollowingModel.findOne({ user_id: req.user.id, following_user_id: data.following_user_id});
    if(!check){
      const newFollowing= new FollowingModel({
        user_id:  req.user.id,
        following_user_id: data.following_user_id,
        following_username: data.following_username,
        type: 'following'
      })
      await newFollowed.save()
      res.status(200).json(newFollowed);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFollowing= async (req, res) => {
  try {
    const data = req.body.data

    const check  = await FollowingModel.findOne({ user_id: req.user.id, following_user_id: data.following_user_id});
    if(check){
      await FollowingModel.deleteOne({
        user_id: req.user.id,
        following_user_id: data.following_user_id,
      });
      res.status(200).json({ message: 'Đã hủy theo dõi' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

