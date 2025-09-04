const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin.ejs";
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware");
const Blog = require("../models/Blog");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * GET request
 * API endpoint to get the admin page
 */
adminRouter.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Panel",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST request
 * API endpoint to login the user
 */
adminRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET request
 * API endpoint to get the dashbaord
 */
adminRouter.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 });
    res.render("admin/dashboard", { data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST request
 * API endpoint to register a user
 */
adminRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already exist" });
      }
      res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET request
 * API endpoint to get the add-blog page
 */
adminRouter.get("/add-blog", async (req, res) => {
  try {
    res.render("admin/add-blog", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST request
 * API endpoint to POST(add) a new blog
 */
adminRouter.post("/add-blog", async (req, res) => {
  try {
    const data = new Blog({
      title: req.body.title,
      body: req.body.body,
    });
    await Blog.create(data);
    // res.status(201).json({ message: "Blog Created", data });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET request
 * API endpoint to get the edit blog page
 */
adminRouter.get("/edit-blog/:id", async (req, res) => {
  try {
    const data = await Blog.findOne({ _id: req.params.id });
    res.render("admin/edit-blog", { data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * PUT request
 * API endpoint to update a blog
 */
adminRouter.put("/edit-blog/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE request
 * API endpoint to delete a blog
 */
adminRouter.delete("/delete-blog/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET request
 * API endpoint to logout a user
 */
adminRouter.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = adminRouter;
