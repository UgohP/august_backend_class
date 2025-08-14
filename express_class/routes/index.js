const express = require("express");
const AppContoller = require("../controllers/AppContoller");
const router = express.Router();

// router.get('/about', AppContoller.getAboutPage)

router.get("/about", (req, res) => {
  res.render("../methods-public/index");
});

module.exports = router;
