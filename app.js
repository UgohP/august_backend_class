const http = require("http");

const port = 3001;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/contact") {
    res.write("Contact Page");
  }
  if (req.url === "/about") {
    res.write("About Page");
  }
  if (req.url === "/search") {
    res.write("Search Page");
  } else {
    res.write("Does not exist");
  }
});

app.listen(port, () => {
  console.log(`App is listening on PORT: ${port}`);
});
