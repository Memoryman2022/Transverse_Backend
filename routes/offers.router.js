const express = require("express");
const router = express.Router();

const Offer = require("../models/Offer.model");
const User = require("../models/User.model");
const { AppError } = require("../middleware/error-handling");
// const Location = require("./models/Location.model");

// post to create new offer
router.post("/api/offers", async (req, res, next) => {
  try {
    const { host, title, description } = req.body;

    const aHost = await User.findOne({ email: host });
    // If user not found, return error
    if (!aHost) {
      return next(new AppError("Host not found", 404));
    }

    // Create a new Offer instance with the host's ID
    const newOffer = new Offer({
      title,
      description,
      host: aHost._id,
    });

    // Save the new offer
    const createdOffer = await newOffer.save();

    res.status(201).json(createdOffer);
  } catch (error) {
    next(new AppError("failed to create offer", 500));
  }
});

// get all offers so we can search and find them <- Pierro
router.get("/api/offers", async (req, res, next) => {
  try {
    const offers = await Offer.find(req.params.id).populate("host");
    if (!offers) {
      throw new AppError("offers not found", 404);
    }
    res.status(200).json({ offers: offers });
  } catch (error) {
    next(error);
  }
});

//get a single offer
router.get("/api/offers/:id", async (req, res, next) => {
  try {
    const offerId = await Offer.findById(req.params.id).populate("host");
    if (!offerId) {
      throw new AppError("offer not found", 404);
    }
    res.status(200).json(offerId);
  } catch (error) {
    next(error);
  }
});

// put so we can edit parts of our offers
router.put("/api/offers/:id", async (req, res, next) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedOffer) {
      throw new AppError("Offer not found", 404);
    }
    res.status(200).json(updatedOffer);
  } catch (error) {
    next(error);
  }
});

// Delete so we can delete our offers
router.delete("/api/offers/:id", async (req, res, next) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      throw new AppError("could ot delete offer", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

//retrieve all offers from given location

router.get("/api/offers/location/:locationId", (req, res, next) => {
  const { locationId } = req.params;

  Offer.find({ location: locationId })
    .populate("location")
    .then((offersByLocation) => {
      if (!offersByLocation) {
        return res.status(400).json({ error: "location not found at all" });
      }
      res.status(200).json(offersByLocation);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
