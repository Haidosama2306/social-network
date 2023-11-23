
import express from "express";
import { getPosts, updatePost } from "../controllers/posts.js";
import { PostModel } from "../models/PostModel.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 để tạo ID duy nhất

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/posts", getPosts);
router.post("/create-post", upload.array("images"), async (req, res) => {
  try {
    const { videos, caption, ...otherPostData } = req.body;

    // Xây dựng mảng ảnh sử dụng req.files
    const uploadedImages = req.files
      ? req.files.map((file) => "/images/upload/" + file.filename)
      : [];

    const newPostData = {
      _id: uuidv4(), // Sử dụng UUID
      images: uploadedImages,
      videos: videos || [],
      caption: caption || "",
      ...otherPostData,
    };

    const newPost = new PostModel(newPostData);
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/update', updatePost);


export default router;
