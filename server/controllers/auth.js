import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import validate from 'validator'
import { BioModel } from "../models/BioModel.js";
export const login = async (req, res)=>{

    try {
        const { email, password } = req.body;
        const validator = []
        if (validate.isEmpty(email)) {
          validator.push({email: 'Không bỏ trống email'})
        }else if (!validate.isEmail(email)) {
          validator.push({email: 'Email của bạn không chính xác'})
        }
        if (!validate.isLength(password,{min: 5, max: 32})) {
          validator.push({password:'Password từ 6 đến 32 kí tự'})
        }
        if (validator.length > 0) {
          return res.status(400).json({err: validator})
        }
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            
            return res.status(400).json({ err: 'Tài khoản hoặc mật khẩu sai!' });
        }else {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                  const payload = { id: user._id, username: user.username };
      
                  jwt.sign(payload, 'abc-xyz', { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
      
                return res.json({ success: true, token: token, user: user._id });
                  });
                } else {
                  return res.status(400).json({ err: 'Tài khoản hoặc mật khẩu không chính xác!' });
                }
            });
        }
    } catch (error) {
        
    }
}
export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const validator = []
        if (validate.isEmpty(email)) {
          validator.push({email: 'Không bỏ trống email'})
        }else if (!validate.isEmail(email)) {
          validator.push({email: 'Email của bạn không chính xác'})
        }
        if (!validate.isLength(password,{min: 5, max: 32})) {
          validator.push({password:'Password từ 6 đến 32 kí tự'})
        }
        if (validate.isEmpty(username)) {
          validator.push({ username: 'Không bỏ trống username' });
        } else if (!validate.isLength(username, { min: 5, max: 32 })) {
          validator.push({ username: 'Username từ 5 đến 32 kí tự' });
        } else if (/\s/.test(username)) {
          validator.push({ username: 'Username không được chứa khoảng trắng' });
        }
        const user = await UserModel.findOne({ email: email });
        
        if (user) {
          validator.push({ email: 'Email đã tồn tại!' });

        }
        const user2 = await UserModel.findOne({ username: username });
        if (user2) {
          validator.push({ username: 'Username đã tồn tại!' });

        }

        if (validator.length > 0) {
          return res.status(400).json({err: validator})
        }
      const newUser = new UserModel({
        username,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
  
          newUser.password = hash;
          newUser.id = Math.random();
  
          try {
            const savedUser = await newUser.save();
            const payload = { id: savedUser._id, username: savedUser.username };

            
            const newBios = new BioModel ({
              user_id: savedUser._id,
              username: savedUser.username,
            });
            await newBios.save();
            
                  jwt.sign(payload, 'abc-xyz', { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
      
                return res.json({ success: true, token: token, user: savedUser._id });
              });

          } catch (err) {
            console.error('Failed to save user to database', err);
            return res.status(500).json({ err: 'Internal Server Error'+ Math.random() });
          }
        });
      });
    } catch (error) {
      console.error('Error in register function', error);
      return res.status(500).json({ errr: 'Internal Server Error' });
    }
  };
  export const logout = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      await UserModel.findByIdAndUpdate({_id : req._id}, { $pull: { tokens: token } }, { new: true }, (err, user) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        return res.status(200).json({ message: 'Logout successful' });
      });
    } catch (error) {
      console.error('Error in logout function', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  export const checkLogin =  (req, res)=>{
    try {
      return res.status(200).json(true) 
    } catch (error) {
      return        res.status(401).json(false) 

    }
  }