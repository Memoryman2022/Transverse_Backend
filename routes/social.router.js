const express = require("express");
const router = express.Router();
const { AppError } = require("../middleware/error-handling");

const SocialModel = require("../models/Social.model");

// post
router.post("/api/social", async (req, res, next) => {
  try {
    const { user, image, caption } = req.body;

    const socialPost = new SocialModel({
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
  } catch (error) {
    next(new AppError("failed to post social", 500));
  }
});

//   get
router.get("/api/social", async (req, res, next) => {
  try {
    const socialPosts = await SocialModel.find();

    res.status(200).json({ posts: socialPosts });
  } catch (error) {
    next(error);
  }
});

// update
router.put("/api/social/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSocial = await SocialModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSocial) {
      return next(new AppError("post not updated", 404));
    }
    res.status(200).json({
      message: "Social post updated successfully!",
      post: updatedSocial,
    });
  } catch (error) {
    next(error);
  }
});
// delete
router.delete("/api/social/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSocial = await SocialModel.findByIdAndDelete(id);
    if (!deletedSocial) {
      return next(new AppError("Social post not found", 404));
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;
