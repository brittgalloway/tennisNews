var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  title: String,

  body: String
});


var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;