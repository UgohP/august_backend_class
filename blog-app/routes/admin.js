const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const adminLayout = "../views/layouts/admin.ejs";

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
    res.send(req.body);
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

module.exports = adminRouter;
