var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema constructor
var NewsSchema = new Schema({
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
    ref: "Comments",
  },
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;
