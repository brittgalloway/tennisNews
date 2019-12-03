const db = require("../models");

module.exports = function(app) {
  // LOAD HOME PAGE WITH HANDLEBARS

  app.get("/", function(req, res) {
    db.News.find()
      .populate("comment")
      .then(News => {
        res.render("index", { News });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
