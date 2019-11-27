const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema constructor
const NewsSchema = new Schema({
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

  // Comments will populate the News
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
