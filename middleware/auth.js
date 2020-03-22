const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, "secretkey!");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }

  // not authorized
}

module.exports = auth;
