const express = require("express");
const router = express.Router();

const Social = require("../models/Social.model");

// post
router.post("/api/social", async (req, res) => {
  try {
    const { user, image, caption } = req.body;

    const socialPost = new Social({
      user,
      image,
      likes: 0,
      caption,
      comments: [],
      postDate: Date.now(),
    });

    const newSocialPost = await socialPost.save();

    res.status(201).json({
      message: "Social post created successfully!",
      post: newSocialPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//   get
router.get("/api/social", async (req, res) => {
  try {
    const socialPosts = await Social.find();

    res.status(200).json({ posts: socialPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update

// delete

module.exports = router;
