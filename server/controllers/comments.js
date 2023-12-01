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
      const cmt = await PostCommentsModel.find({post_id: data.post_id});
      // const cmt = await PostCommentsModel.find();
      console.log('cmt: ',cmt);
      res.status(200).json(cmt);
  } catch (err) {
      res.status(500).json({ error: err });

  }
}
export const insertComments = async (req, res) => {
  try {
    const data = req.body
    console.log('data:',data);
    const check  = await PostCommentsModel.findOne({ user_id: req.user.id});

    if(check){
      const newComments = new PostCommentsModel({
        user_id:  req.user.id,
        post_id: data.post_id,
        username: data.username,
        body: data.body
      })
      // await newComments.save()

      console.log('check: ', check);
      console.log('newComments: ',newComments);
      res.status(200).json(newComments);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};