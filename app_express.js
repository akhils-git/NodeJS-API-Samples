const express = require("express");
const app = new express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/players", (req, res) => {
  res.send(["sachin", "don"]);
});

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Listening port${port}`);
});
