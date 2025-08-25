const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

/**
 * GET request
 * API endpoint to get all blogs
 */
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Blog App",
      description: "A blog app created with Nodejs, Express and MongoDB",
    };

    const perPage = 5;
    const page = parseInt(req.query.page) || 1;

    const data = await Blog.aggregate({ $sort: { createdAt: -1 } })
      .skip(perPage * page - perPage)
      .limit(5)
      .exec();

    const count = await Blog.countDocuments();
    const nextPage = page + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      currentPage: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET request
 * API endpoint to get a particular blog
 */
router.get("/blog/:id", async (req, res) => {
  try {
    const data = await Blog.findById(req.params.id);

    const locals = {
      title: data.title,
      description: "A blog app created with Nodejs, Express and MongoDB",
    };
    res.render("blog", { data, locals });
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
