import { PostModel } from "../models/PostModel.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        console.log('posts', posts);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// export const createPost = async (req, res) => {
//     try {
//         // Handle image uploads using multer
//         upload.array('images')(req, res, async function (err) {
//             if (err instanceof multer.MulterError) {
//                 return res.status(400).json({ error: 'Error uploading images' });
//             } else if (err) {
//                 return res.status(500).json({ error: 'Server error' });
//             }

//             const { videos, caption, ...otherPostData } = req.body;

//             // Construct images array using req.files
//             const uploadedImages = req.files ? req.files.map(file => '/images/upload/' + file.filename) : [];

//             const newPostData = {
//                 images: uploadedImages,
//                 videos: videos || [],
//                 caption: caption || "",
//                 ...otherPostData
//             };

//             const newPost = new PostModel(newPostData);
//             const savedPost = await newPost.save();

//             res.status(201).json(savedPost);
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

export const updatePost = async (req, res) => {
    try {
        const updatePostData = req.body;

        const updatedPost = await PostModel.findOneAndUpdate(
            { user_id: updatePostData.user_id },
            updatePostData,
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
