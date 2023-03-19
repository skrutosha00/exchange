let express = require("express");
let path = require("path");
let fetch = require("node-fetch");

let app = express();

var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);

app.use(express.static(path.resolve("./dist")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.get("/get_uzs_rate", async (req, res) => {
  const response = await fetch("https://nbu.uz/exchange-rates/json/");
  const body = await response.json();

  res.send(body);
});
