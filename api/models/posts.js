const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: { type: String, default: 'untitled' },
  content: { type: String, required: true},
  author: String,
  date: Date
});

const postsSchema = new mongoose.Schema({
  _id: Number,
  title: { type: String, required: true},
  content: String,
  author: String,
  date: Date,
  comments: [commentSchema]
});

mongoose.model('Post', postsSchema);
// const Comment =
mongoose.model('Comment', postsSchema);

// module.exports = { Post, Comment };
