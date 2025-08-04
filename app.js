const http = require("http");

const port = 3001

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end('Hello Pasky')
});

app.listen(port, ()=>{
    console.log(`App is listening on PORT: ${port}`)
})