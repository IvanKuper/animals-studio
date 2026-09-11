const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "file is too large" });
  }
  if (err.message === "unsupported file type") {
    return res.status(415).json({ error: err.message });
  }
  console.error(err);
  res.status(err.status || 500).json({ error: "internal server error" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.use("/api/register");
// app.use("/api/login")
// app.use("/api/asdfa")

module.exports = app;
