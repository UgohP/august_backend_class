const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Blog App",
      description: "A blog app created with Nodejs, Express and MongoDB",
    };
    const data = await Blog.find().sort({createdAt: -1});
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  const locals = {
    title: "Blog App",
    description: "about",
  };
  res.render("about", { locals });
});

module.exports = router;
