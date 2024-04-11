const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken");

const Offer = require("../models/Offer.model");
const User = require("../models/User.model");
const { AppError } = require("../middleware/error-handling");

// POST to create a new offer
router.post("/api/offers", authenticateToken, async (req, res, next) => {
  try {
    const {
      title,
      description,
      offerImage,
      location,
      availableFrom,
      availableUntil,
      utilities,
    } = req.body;
    const hostId = req.payload.userId; // Ensure your authentication middleware correctly sets `req.payload`

    const newOffer = new Offer({
      title,
      description,
      offerImage,
      location,
      availableFrom,
      availableUntil,
      utilities,
      host: hostId,
    });

    const createdOffer = await newOffer.save();
    res.status(201).json(createdOffer);
  } catch (error) {
    next(new AppError("Failed to create offer", 500));
  }
});

// GET all offers
router.get("/api/offers", async (req, res, next) => {
  try {
    const offers = await Offer.find().populate("host"); // Corrected from req.params.id which is not necessary for finding all offers
    res.status(200).json({ offers });
  } catch (error) {
    next(new AppError("Offers not found", 404));
  }
});

// GET a single offer
router.get("/api/offers/:id", async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id).populate("host");
    if (!offer) {
      throw new AppError("Offer not found", 404);
    }
    res.status(200).json(offer);
  } catch (error) {
    next(new AppError("Error fetching offer", 500));
  }
});

// PUT to update an offer
router.put("/api/offers/:id", authenticateToken, async (req, res, next) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOffer) {
      throw new AppError("Offer not found", 404);
    }
    res.status(200).json(updatedOffer);
  } catch (error) {
    next(new AppError("Error updating offer", 500));
  }
});

// DELETE an offer
router.delete("/api/offers/:id", authenticateToken, async (req, res, next) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      throw new AppError("Could not delete offer", 404);
    }
    res.status(204).end();
  } catch (error) {
    next(new AppError("Error deleting offer", 500));
  }
});

// GET all offers from a given location
router.get("/api/offers/location/:locationId", async (req, res, next) => {
  const { locationId } = req.params;

  try {
    const offersByLocation = await Offer.find({
      location: locationId,
    }).populate("host");
    if (!offersByLocation.length) {
      throw new AppError("Location not found or no offers in location", 404);
    }
    res.status(200).json(offersByLocation);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
