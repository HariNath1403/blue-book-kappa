const express = require("express");
const cors = require("cors");
const path = require("path");

const refRouter = require("./router/refRouter");
const AppError = require("./controller/appError");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/reference", refRouter);
app.use(express.static(`${__dirname}/public`));

// Serve the guidelines-old folder
app.use("/guidelines", express.static(path.join(__dirname, "guidelines-old")));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
