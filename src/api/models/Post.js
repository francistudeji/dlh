const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

PostSchema.plugin(timestamp);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
