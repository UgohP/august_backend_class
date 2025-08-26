require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const router = require("./routes/main");
const connectDB = require("./utils/db");
const adminRouter = require("./routes/admin");

const app = express();

const PORT = 7000 || process.env.PORT;
connectDB();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("", router);
app.use("", adminRouter)

app.listen(PORT, (req, res) => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
