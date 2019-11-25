var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema constructor
var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  // Comments will populate the Article
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
