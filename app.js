const express = require("express");
const cors = require("cors");
const path = require("path");

const refRouter = require("./router/refRouter");
const AppError = require("./controller/appError");

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

// Example Express route for rendering PDF
app.get("/reference", (req, res) => {
  const { filePath, page } = req.query;

  // Check if the parameters exist
  if (filePath && page) {
    res.render("reference", {
      filePath: filePath, // Path to the PDF file
      startPage: parseInt(page, 10), // Starting page to load
    });
  } else {
    // Handle the case where parameters are missing
    res.status(400).send("Missing parameters: filePath or page");
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
