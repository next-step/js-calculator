const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
