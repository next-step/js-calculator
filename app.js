const express = require("express");
const app = express();

app.set("views", __dirname);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
