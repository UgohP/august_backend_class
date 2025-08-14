const express = require("express");
const router = require("./routes");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./methods-public"));
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
