const mongoose = require("mongoose");

// Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
