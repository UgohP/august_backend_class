const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin.ejs";
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth.middleware");
const JWT_SECRET = process.env.JWT_SECRET;

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

adminRouter.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    res.render("admin/dashboard", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

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

adminRouter.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = adminRouter;
