import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "Users._id"
    },
    sender_user_id: {
      type: String,
      require: true,
      ref: 'Users._id'
    },
    type: {
      type: String,
      required: true,
    },
    post_id:{
        type: String,
        ref: 'Post._id'
    }
    //Created_at , Updated_at
  },
  { timestamps: true }
);

export const NotifyModel = mongoose.model("Notify", schema);
