const express = require("express");

const app = express();
const port = 3000;
console.log(process.argv);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/me", (req, res) =>
  res.send({ name: "Charlie", love: ["MTB", "Soccer"] })
);

app.get("/about", (req, res) => res.send("About page....!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
