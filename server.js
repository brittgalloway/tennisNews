var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/htmlRoutes")(app);
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/tennisNews", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", (req, res) => {
  // First, we grab the body of the html with axios
  axios.get("https://www.atptour.com/en/news").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
  
    // console.log(listing.html());

    $(".listing-item").each(function(i, element) {
      // Save an empty result object
      var result = {};

      result.headline = $(this)
        .find("div")
        .find("h3")
        .text()
        .trim();
      // console.log(1, result.headline);
      result.thumbNail = $(this)
        .find("a")
        .find("img")
        .attr("src");
      // console.log(2, result.thumbNail);
      result.category = $(this)
        .find("div")
        .find(".listing-category-title")
        .text()
        .trim();
      // console.log(3, result.category);
      result.url = $(this)
        .children("a")
        .attr("href");
      // console.log(4, result.url);

      // Create a new News using the `result` object built from scraping
      db.News.create(result)
        .then(dbNews => {
          // View the added result in the console
          console.log(dbNews);
        })
        .catch(err => {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete <a href='/'>Home</a>");
  });
});

// Route for getting all news from the db
// app.get("/news", (req, res) => {
//   // TODO: Finish the route so it grabs all of the news
//   db.News.find()
//     .then(dbNews2 => {
//       res.json(dbNews2);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
app.get("/populatedNews", function(req, res) {
  // Find all users
  db.News.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("comment")
    .then(function(dbNews) {
      // If able to successfully find and associate all Newss and Notes, send them back to the client
      res.json(dbNews);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for grabbing a specific News by id, populate it with it's note
app.get("/news/:id", function(req, res) {
  db.News.find({ _id: req.params.id })
    .populate("comment")
    .then(function(dbNews3) {
      res.json(dbNews3);
    })
    .catch(function(err) {
      res.json(err);
    });
});
// app.get("/news/:id", function(req, res) {
//   db.News.find({})
//     // ..and populate all of the notes associated with it
//     .populate("comment")
//     .then(function(dbNews3) {
//       // If we were able to successfully find an News with the given id, send it back to the client
//       res.json(dbNews3);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// Route for saving/updating an News's associated Comment
// app.post("/news/:id", function(req, res) {
//   // Create a new comment and pass the req.body to the entry
//   db.Comment.create(req.body)
//     .then(function(dbComment) {
//       return db.News.findOneAndUpdate(
//         { _id: req.params.id },
//         { $push: { comment: dbComment._id } },
//         { new: true },
//       );
//     })
//     .then(function(dbNews3) {
//       // If we were able to successfully update an News, send it back to the client
//       res.json(dbNews3);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
app.post("/news/:id", function(req, res) {
  // Create a new comment and pass the req.body to the entry
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.News.findOneAndUpdate(
        {},
        { $push: { comment: dbComment._id } },
        { new: true },
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
