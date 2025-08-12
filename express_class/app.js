const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./methods-public"));

app.post("/login", (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name}`);
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
