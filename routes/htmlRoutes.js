var db = require("../models");



module.exports = function(app) {

  // LOAD HOME PAGE WITH HANDLEBARS

  app.get("/", function(req, res) {

    res.render("index");

  });
}