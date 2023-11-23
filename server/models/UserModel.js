import mongoose from "mongoose";
import crypto from "crypto";

const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 150,
        unique: true
    },
    ImgUser: {
      type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 150,
        unique: true
    },
    //Created_at , Updated_at
}, { timestamps: true} 
);

export const UserModel = mongoose.model('Users', schema);