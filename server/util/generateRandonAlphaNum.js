const crypto = require("crypto");

const generateRandomAlphaNum = (strSize) =>
  crypto.randomBytes(strSize).toString("hex").slice(0, strSize);

module.exports = generateRandomAlphaNum;
