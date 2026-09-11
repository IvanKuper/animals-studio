const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const createMulter = (uploadTo, fileSize, fileFilterFunction) => {
  const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadTo);
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname).toLowerCase();
      cb(null, `${crypto.randomUUID()}${extension}`);
    },
  });
  return multer({
    storage: multerConfig,
    limits: {
      fileSize,
    },
    fileFilter: fileFilterFunction,
  });
};

module.exports = createMulter;
