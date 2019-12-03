var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");



var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 3000;


var app = express();



app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/htmlRoutes")(app);
mongoose.connect("mongodb://localhost/tennisNews", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Routes

app.get("/scrape", (req, res) => {
  axios.get("https://www.atptour.com/en/news").then(function(response) {
    var $ = cheerio.load(response.data);


    $(".listing-item").each(function(i, element) {
      var result = {};

      result.headline = $(this)
        .find("div")
        .find("h3")
        .text()
        .trim();
      result.thumbNail = $(this)
        .find("a")
        .find("img")
        .attr("src");
      result.category = $(this)
        .find("div")
        .find(".listing-category-title")
        .text()
        .trim();
      result.url = $(this)
        .children("a")
        .attr("href");

      db.News.create(result)
        .then(dbNews => {
          console.log(dbNews);
        })
        .catch(err => {
          console.log(err);
        });
    });
    res.send("Scrape Complete <a href='/'>Home</a>");
  });
});
app.get("/populatedNews", function(req, res) {
  db.News.find({})
    .populate("comment")
    .then(function(dbNews) {
      res.json(dbNews);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/news/:id", function(req, res) {
  
  db.News.find({ _id: req.params.id }) //find the specific News article's id
    .populate("comment")
    .then(function(dbNews3) {
      res.json(dbNews3);
    })
    .catch(function(err) {
      res.json(err);
    });
});
app.post("/news/:id", function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.News.findOneAndUpdate(
        { _id: req.body.news }, //get the correct news article
        { $push: { comment: dbComment._id } }, //push comment into the news comment array
        { new: true }
      );
    })
    .then(function(dbNews3) {
      res.json(dbNews3);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});
