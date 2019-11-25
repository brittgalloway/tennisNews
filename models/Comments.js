var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
