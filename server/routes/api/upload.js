const express = require("express");
const router = express.Router();

const multer = require("../../config/multerTypes");
const upload = multer.createMulter(
  "uploads/",
  3000000,
  multer.allowedTypes.img
);

router.post("/", upload.single("avatar"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "an image is required" });
  }
  res.status(201).json({ filename: req.file.filename });
});

module.exports = router;
