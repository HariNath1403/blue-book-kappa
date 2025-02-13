const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("ERROR!, Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("ERROR!, Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
