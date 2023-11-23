import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      ref: "Users._id"
    },
    receiver_user_id: {
      type: String,
      require: true,
      ref: 'Users._id'
    },
    content: {
      type: String,
      required: true,
    },
    roomID:{
      type: String,
      required: true,
      ref: 'RoomChat._id'
    },
    type: {
      type: String,
      required: true
    },
    file:{
      type: String,

    }
    //Created_at , Updated_at
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", schema);
