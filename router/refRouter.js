const express = require("express");
const controller = require("../controller/refController");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Hit route: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/guidelines/:filename", controller.servePdf);

module.exports = router;
