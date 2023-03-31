const router = require("express").Router();
const { Post, User } = require("../../models");
const auth = require("../../utils/auth");

// The `/api/posts` endpoint

// get all posts
router.get("/", async (req, res) => {
  try {
    const Posts = await Post.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(Posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the post matching :id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new post
router.post("/", auth, async (req, res) => {
  try {
    const postBody = {
      user_id: req.session.user_id,
      ...req.body,
    };
    const newPost = await Post.create(postBody);
    res.status(200).json({ post_id: newPost.id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update the post matching :id
router.put("/:id", auth, async (req, res) => {
  try {
    const [updatedPost] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedPost) {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User }],
      });
      res.status(200).json(post);
    } else {
      res.status(404).json({
        failure: `Post could not be found.`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete the post matching :id
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedPost) {
      res.status(200).json({
        success: `Post ID ${req.params.id} deleted.`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
