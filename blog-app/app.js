const express = require("express");
const expressLayout = require("express-ejs-layouts");
const router = require("./routes/main");

const app = express();

const PORT = 7000;

app.use(express.static("public"));

//Template Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("", router);

app.listen(PORT, (req, res) => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
