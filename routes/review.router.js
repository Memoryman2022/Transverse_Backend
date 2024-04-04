const router = require("express").Router();
const ReviewModel = require("../models/Review.model");
const AppError = require("../middleare/error-handling");

//Post
router.post("/create-a-review", (req, res, next) => {
  ReviewModel.create(req.body)
    .then((review) => res.status(201).json(review))
    .catch((error) => next(new AppError("Failed to create review", 500)));
});
//Get
router.get("/get-review/:id", (req, res, next) => {
  ReviewModel.findById(req.params.id)
    .then((review) => {
      if (!review) throw new AppError("Review not found", 404);
      res.status(200).json(review);
    })
    .catch(next);
});

//Update
router.put("/update-a-review/:reviewId", async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      req.body,
      { new: true }
    );
    if (!updatedReview) return next(new AppError("Review not found.", 404));
    res.status(200).json({ message: "Review updated", updatedReview });
  } catch (error) {
    next(error);
  }
});
//Delete
router.delete("/reviews/:id", (req, res, next) => {
  ReviewModel.findByIdAndDelete(req.params.id)
    .then((deletedReview) => {
      if (!deletedReview)
        return next(new AppError("Could not delete review", 404));
      res.status(204).end();
    })
    .catch(next);
});

module.exports = router;
