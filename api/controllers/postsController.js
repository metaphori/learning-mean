// const { Post, Comment } = require('../models/posts');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const index = function(req, res) {
  res.render('index', { title: 'Express-oh!' });
};

const showPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

const showPost = (req, res) => {
  // console.log(`Getting post ${req.params.postId}`);
  Post.findById(req.params.postId).exec((err,post) => {
    if(!post){
      return res.status(404).json({ message: "post not found" });
    } else if(err){
      return res.status(404).json(err);
    }
    console.log(`Got post ${req.params.postId}`);
    res.status(200).json(post);
  });
};

const showCommentsForPost = (req, res) => {
  Post.findById(req.params.postId).exec((err,post) => {
    if(!post){
      return res.status(404).json({ message: "post not found" });
    } else if(err){
      return res.status(404).json(err);
    }
    res.status(200).json(post.comments);
  });
};

const getComment = (req, res) => {
  Post.findById(req.params.postId).exec((err,post) => {
    if(!post){
      return res.status(404).json({ message: "post not found" });
    } else if(err){
      return res.status(404).json(err);
    }
    res.status(200).json(post.comments.id(req.params.commentId));
  });
};

const createPost = (req, res) => {
  Post.create({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
    comments: req.body.comments || []
  }, (err, newPost) => {
    if(err){
      res.status(400).json(err);
    } else {
      res.status(201).json(newPost);
    }
  });
};

/*
const createComment = async (req, res) => {
  try{
    const post = await Post.findById(req.params.postId);
    if(!post){ return res.status(400).json({ message: "Cannot find post"}); }
    post.comments.push({
      title: req.body.title,
      content: req.body.content, // required
      author: req.body.author,
      date: req.body.date
    });
    const updatedPost = await post.save();
    if(!updatedPost){ return res.status(400).json({ message: `Cannot update post ${post.stringify()}` }); }
    return res.status(201).json(updatedPost);
  } catch(exc){ return res.status(400).json({ message: `${exc}` }); }
};
*/
const createComment = (req, res) => {
    console.log("Create comment");
    Post.findById(req.params.postId).exec()
    .then(post => {
      if(!post) return Promise.reject({ message: 'Cannot find post'});
      console.log("Saving post " + post);
      post.comments.push({
        title: req.body.title,
        content: req.body.content, // required
        author: req.body.author,
        date: req.body.date
      });
      return post.save();
    })
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(err => res.status(400).json({ message: `Cannot save post: ${err.message}`}));
};

const updateComment = (req, res) => {
  // must find parent post, find relevant comment, update it, and then save parent post
  // see createComment
  res.status(200).json(
    {}
  );
};

const deleteComment = (req, res) => {
  console.log("Delete comment");
  Post.findById(req.params.postId).exec()
  .then(post => {
    if(!post) return Promise.reject({ message: 'Cannot find post'});
    console.log("Deleting comment in " + post);
    var comment = post.comments.id(req.params.commentId);
    if(comment){ comment.remove(); return post.save(); }
    else return Promise.resolve(post);
  })
  .then(updatedPost => res.status(204).json(updatedPost))
  .catch(err => res.status(400).json({ message: `Cannot update post: ${err.message}`}));
};

module.exports = { index, showPosts, showCommentsForPost, showPost, createPost,
  getComment, createComment, updateComment, deleteComment };
