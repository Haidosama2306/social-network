import mongoose from "mongoose";

const schema = new mongoose.Schema({
  follower_user_id: {
    type: String,
    ref: "Users._id"
  },
  user_id: {
    type: String,
    ref: "Users._id"
  },
  follower_username: {
    type: String,
  },
  type: {
    type: String
  }
  // Created_at, Updated_at
}, { timestamps: true });

export const FollowersModel = mongoose.model('Followers', schema);
