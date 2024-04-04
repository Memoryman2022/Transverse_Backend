const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const AppError = require("../middleware/error-handling");

//Post
router.post("/create-a-review", async (req, res, next) => {
  try {
    const review = await ReviewModel.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(new AppError("Failed to create review", 500));
  }
});

//Get
router.get("/get-review/:id", async (req, res, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

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
    const updatedReview = await ReviewModel.findByIdAndUpdate(
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
router.delete("/reviews/:id", async (req, res, next) => {
  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      throw new AppError("Could not delete review", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
