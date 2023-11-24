// routes/posts.js
import express from "express";
import { getPosts, updatePost } from "../controllers/posts.js";
import { PostModel } from "../models/PostModel.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/create-post", async (req, res) => {
  try {
    const { caption, ...otherPostData } = req.body;
    const uploadedImages = req.body.images || [];

    // Thêm timestamp vào URL ảnh để tránh cache
    const timestamp = new Date().getTime();
    const imagesWithTimestamp = uploadedImages.map((imageUrl) => `${imageUrl}?timestamp=${timestamp}`);

    const newPostData = {
      images: imagesWithTimestamp,
      caption: caption || "",
      ...otherPostData,
    };
    res.set('Cache-Control', 'no-store');
    const newPost = new PostModel(newPostData);
    const savedPost = await newPost.save();

    if (!savedPost) {
      return res.status(500).json({ error: "Error saving post" });
    }

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/update", updatePost);

export default router;
