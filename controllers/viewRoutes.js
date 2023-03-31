// views.js

const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const User = require("../models/User");
const Post = require("../models/Post");
const title = "The Tech Codex";

// home
router.get("/", async (req, res) => {
  const postsPerPage = 5; // number of records per page
  const pageNumber = req.query.page || 1;
  const { count, rows: recentPosts } = await Post.findAndCountAll({
    offset: (pageNumber - 1) * postsPerPage,
    limit: postsPerPage,
    order: [["createdAt", "DESC"]],
    include: [{ model: User }],
  });

  res.render("home", {
    title: title + " - Home",
    username: req.session.username,
    isLoggedIn: req.session.logged_in,
    recentPosts,
    totalPages: Math.ceil(count / postsPerPage),
    currentPage: pageNumber, // page number requested, default to 1
  });
});

// get a post with /post?id=123
router.get("/post", async (req, res) => {
  // get the post matching ?id=
  const post = await Post.findByPk(req.query.id, {
    include: [{ model: User }],
  });
  res.render("post", {
    title: title + " - Post " + req.query.id,
    username: req.session.username,
    isLoggedIn: req.session.logged_in,
    post: post,
  });
});

// register
router.get("/register", (req, res) => {
  res.render("register", { title: title + " - Register" });
});

// dashboard (requires authentication)
router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    title: title + " - Dashboard",
    username: req.session.username,
    isLoggedIn: req.session.logged_in,
  });
});

// dashboard (requires authentication)
router.get("/create-post", auth, (req, res) => {
  res.render("create-post", {
    title: title + " - Create Post",
    username: req.session.username,
    isLoggedIn: req.session.logged_in,
  });
});

router.get("/my-posts", auth, async (req, res) => {
  const posts = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  console.log(posts);
  res.render("my-posts", {
    title: title + " - My Posts",
    username: req.session.username,
    isLoggedIn: req.session.logged_in,
    posts: posts,
  });
});

module.exports = router;
