var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema constructor
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  thumbNail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  // Comments will populate the Article
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
