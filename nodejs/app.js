const http = require("http");
const fs = require("fs");

const homePage = fs.readFileSync("./public/navbar/navbar.html");
const homeStyles = fs.readFileSync("./public/navbar/navbar.css");
const logo = fs.readFileSync("./public/navbar/logo.svg");
const homeScript = fs.readFileSync("./public/navbar/navbar.js");
const aboutPage = fs.readFileSync("./public/about/about.html");
const aboutStyles = fs.readFileSync("./public/about/about1.css");

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(homePage);
    res.end();
  } else if (url === "/navbar.css") {
    res.setHeader("Content-Type", "text/css");
    res.write(homeStyles);
    res.end();
  } else if (url === "/logo.svg") {
    res.setHeader("Content-Type", "image/svg+xml");
    res.write(logo);
    res.end();
  } else if (url === "/navbar.js") {
    res.setHeader("Content-Type", "text/js");
    res.write(homeScript);
    res.end();
  } else if (url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write(aboutPage);
    res.end();
  } else if (url === "/about1.css") {
    res.setHeader("Content-Type", "text/css");
    res.write(aboutStyles);
    res.end();
  } else if (url === "/signin") {
    res.write("Signin");
    res.end();
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`App is listening on PORT: ${port}`);
});