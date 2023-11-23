import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    ref: "Users._id",
  },
  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthday: {
    type: String,
  },
  introduct: {
    type: String,
  },
  // Created_at, Updated_at
}, { timestamps: true });

export const BioModel = mongoose.model("Bio", schema);
