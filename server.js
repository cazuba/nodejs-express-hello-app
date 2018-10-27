const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log.");
      console.log(err);
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", str => str.toUpperCase());

console.log(process.argv);

app.get("/", (req, res) =>
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website..."
  })
);

app.get("/me", (req, res) =>
  res.send({ name: "Charlie", love: ["MTB", "Soccer"] })
);

app.get("/about", (req, res) =>
  res.render("about.hbs", {
    pageTitle: "About Page"
  })
);

app.get("/projects", (req, res) =>
  res.render("projects.hbs", {
    pageTitle: "Projects Page"
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
