const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes")


// express app
const app = express();

// Connect to mongodb

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// Middleware & static files, everything inside public will be made available as a static file to the Front end
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan("dev"));

//  routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  // res.send('<p>about page<p/>')
  res.render("about", {
    title: "About"
  });
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page use this function for every incoming request, it fires every sinle request regardless of url and it goes at the very bottom


// middleware is a ny code which runs on the server between getting a request and sending a response