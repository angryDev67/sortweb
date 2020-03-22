module.exports = function(req, res, next) {
  // 401 - non authroeized, not valid token
  // 403 forbidden // valid, but they are not allowed
  // req.user sets in auth middle
  if (!req.user.isAdmin)
    return res.status(403).json({ success: false, message: "access denied" });
  next();
};
