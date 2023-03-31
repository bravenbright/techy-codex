const auth = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    if (req.is("application/json")) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.redirect("/");
    }
  }
};

module.exports = auth;
