import mongoose from "mongoose";

const schema = new mongoose.Schema({
    post_id: {
        type: String,
        ref: "Posts._id"
      },
      user_id: {
        type: String,
        ref: "Users._id"
      },
      username: {
        type: String,
      },
    body: {
        type: String,
    },
    //Created_at , Updated_at
}, { timestamps: true} 
);

export const PostCommentsModel = mongoose.model('Comments', schema);