import mongoose from "mongoose";

const schema = new mongoose.Schema({
  following_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users._id"
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users._id"
  },
  // Created_at, Updated_at
}, { timestamps: true });

export const FollowingModel = mongoose.model('Following', schema);
