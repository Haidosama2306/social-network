// models/postModel.js
import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    images: [{ type: String }],
    videos: [{ type: String }],
    caption: { type: String },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
