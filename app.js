const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const port = 3000;
const Blog = require("./models/blogs");

console.log(Blog);

const dbUrl =
  "mongodb+srv://netNinja:test1234@cluster0.5bladtz.mongodb.net/node-tust?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("concted db"))
  .catch((err) => console.log(err.reason));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new Blog",
    snippet: "new snippet",
    body: "new body",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// connect to databce MongoDB

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Abed finds eggs",
      snappiet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, temporibus?",
    },
    {
      title: "Mario finds eggs",
      snappiet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, temporibus?",
    },
    {
      title: "Khader finds eggs",
      snappiet:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, temporibus?",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.use(morgan("dev"));

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
app.listen(port);
