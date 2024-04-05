const router = require("express").Router();
const Review = require("../models/Review.model");
const { AppError } = require("../middleware/error-handling");
const User = require("../models/User.model");
//Post
router.post("/create-a-review", async (req, res, next) => {
  try {
    const { user, host, rating, comments } = req.body;
    if (!user || !host) {
      throw new AppError("User or Host not found", 404);
    }

    const userId = await User.findOne({ email: user });
    const hostId = await User.findOne({ email: host });

    const review = await Review.create({
      user: userId._id,
      host: hostId._id,
      rating,
      comments,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    next(new AppError("Failed to create review", 500));
  }
});

//Get
router.get("/get-review/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate("host");
    if (!review) {
      throw new AppError("Review not found", 404);
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

//Update
router.put("/update-a-review/:reviewId", async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      throw new AppError("Review not found.", 404);
    }
    res.status(200).json({ message: "Review updated", updatedReview });
  } catch (error) {
    next(error);
  }
});
//Delete
router.delete("/review/:id", async (req, res, next) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      throw new AppError("Could not delete review", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
