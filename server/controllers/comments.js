import { PostCommentsModel } from '../models/PostCommentsModel.js';


export const comments = async (req, res) => {
  try {
    const cmt = await PostCommentsModel.find();
    res.status(200).json(cmt);

  } catch (err) {
    res.status(500).json({ error: err });

  }
}

export const findComments = async (req, res) => {
  try {

    const data = req.body.data
    const cmt = await PostCommentsModel.find({ post_id: data.post_id });
    // const cmt = await PostCommentsModel.find();
    console.log('cmt: ', data);
    res.status(200).json(cmt);
  } catch (err) {
    res.status(500).json({ error: err });

  }
}
export const insertComments = async (req, res) => {
  try {
    const data = req.body.data
    console.log('data:', data);

    const newComments = new PostCommentsModel({
      user_id: req.user.id,
      post_id: data.post_id,
      username: data.username,
      body: data.body
    })
    await newComments.save()

    console.log('newComments: ', newComments);
    res.status(200).json(newComments);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};