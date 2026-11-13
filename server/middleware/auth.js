const jwt = require("../config/jwt");

// Requires a valid JWT (signed with JWT_KEY) in the x-auth-token header.
module.exports = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({ error: "authentication required" });
  }
  try {
    req.user = await jwt.verifyToken(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid or expired token" });
  }
};
