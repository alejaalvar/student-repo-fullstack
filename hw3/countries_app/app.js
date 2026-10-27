const express = require("express");
const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));
const port = 3000;
const url = "http://localhost";

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/countries", (req, res) => {
  res.render("countries", { title: "Countries" });
});

app.get("/populous", (req, res) => {
  res.render("populous", { title: "Populous" });
});

app.get("/regions", (req, res) => {
  res.render("regions", { title: "Regions" });
});

app.listen(port, () => console.log(`${url}:${port}`));
