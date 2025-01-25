const express = require("express");
const cors = require("cors");
const path = require("path");

const AppError = require("./controller/appError");
const checklist = require("./controller/checklist");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.path.endsWith(".pdf")) {
    res.contentType("application/pdf");
  }
  next();
});

app.get("/reference", (req, res) => {
  const { filePath, page } = req.query;

  if (filePath && page) {
    res.render("reference", {
      filePath: filePath,
      startPage: parseInt(page, 10),
    });
  } else {
    res.status(400).send("Missing parameters: filePath or page");
  }
});

app.get("/checklist", (req, res) => {
  const { target, lang } = req.query;

  if (target && lang) {
    res.render("checklist", {
      selectedRef: checklist[target],
      language: lang,
    });
  } else {
    res.status(400).send("Missing parameters");
  }
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
