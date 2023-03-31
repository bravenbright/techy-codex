const router = require("express").Router();
const { Op } = require("sequelize");
const { User } = require("../../models");

// create new user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    if (err.name.includes("Sequelize")) {
      const errorMessages = err.errors.map((error) => error.message);
      res.status(400).json({ message: errorMessages });
    } else {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// login as user
router.post("/login", async (req, res) => {
  try {
    if (req.body.user) {
      if (req.body.user.includes("@")) {
        whereParam = { email: req.body.user };
      } else {
        whereParam = { username: req.body.user };
      }
    } else {
      res.status(403).json({ message: "Email or username required." });
      return;
    }
    const user = await User.findOne({
      where: whereParam,
    });
    if (user) {
      const validPassword = await user.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(403).json({ message: "Authentication failed." });
        return;
      }
    } else {
      res.status(403).json({ message: "Authentication failed." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      res.json({ user: user, message: "Login successful." });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// logout user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
