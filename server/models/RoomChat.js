import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

export const RoomChat = mongoose.model("RoomChat", schema);
