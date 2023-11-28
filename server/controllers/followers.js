import { FollowersModel } from '../models/FollowersModel.js';
import { FollowingModel } from '../models/FollowingModel.js';


export const followed = async (req, res) => {
  try {
    const users = await FollowersModel.find();
    console.log(users);
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}


export const getFollowed = async (req, res) => {
  try {
    const user = await FollowersModel.find({ user_id: req.user.id });
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}
export const searchfollowed = async (req, res) => {
  try {
    const data = req.body.data
    const followed = await FollowersModel.find({ username: { $regex: data, $options: 'i' } });
    res.status(200).json(followed);

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
        type: data.type
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
    console.log(users);
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}
export const getFollowing = async (req, res) => {
  try {
    const user = await FollowingModel.find({ user_id: req.user.id });
    res.status(200).json(user);

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

export const insertFollowing = async (req, res) => {
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

