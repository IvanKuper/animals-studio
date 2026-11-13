const fs = require("fs");

// The MIME type comes from the client, so check the real file header too.
const signatures = {
  "image/jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) => b.toString("hex", 0, 8) === "89504e470d0a1a0a",
  "image/gif": (b) => ["GIF87a", "GIF89a"].includes(b.toString("latin1", 0, 6)),
  "image/webp": (b) =>
    b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WEBP",
  "image/avif": (b) => b.toString("latin1", 4, 8) === "ftyp",
  "image/apng": (b) => b.toString("hex", 0, 8) === "89504e470d0a1a0a",
};

module.exports = (req, res, next) => {
  if (!req.file) return next();
  const check = signatures[req.file.mimetype];
  const head = Buffer.alloc(12);
  const fd = fs.openSync(req.file.path, "r");
  try {
    fs.readSync(fd, head, 0, 12, 0);
  } finally {
    fs.closeSync(fd);
  }
  if (check && check(head)) return next();
  fs.unlink(req.file.path, () => {});
  res.status(415).json({ error: "file content does not match an image type" });
};
