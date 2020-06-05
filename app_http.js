const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("hello world");
    res.end();
  }

  if (req.url === "/api/players") {
    res.write(JSON.stringify(["Sachin", "Savrav", "Dhoni"]));
    res.end();
  }
});

server.listen(3003);
console.log("Lisntening...");
