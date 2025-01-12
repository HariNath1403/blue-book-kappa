const path = require("path");

exports.servePdf = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "..", "guidelines-old", fileName);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).send("File not found");
    }
  });
};
