const express = require("express");
const router = express.Router();

const Offer = require("../models/Offer.model");
// const Location = require("./models/Location.model");

// post to create new offer
router.post("/api/offers", (req, res) => {
  //check REQ.BODY!!!
  Offer.create({})
    .then((createdOffer) => {
      console.log("offer was added", createdOffer);
      res.status(201).json(createdOffer);
    })
    .catch((error) => {
      console.error("impossible to create the offer", error);
      res.status(500).json({ error: "could not create the offer" });
    });
});

// get all offers so we can search and find them <- Pierro
router.get("/api/offers", (req, res, next) => {
  Offer.find()
    .populate("offers")
    .then((offers) => {
      res.json(offers);
    })
    .catch((error) => {
      next(error);
    });
});

//get a single offer
router.get("/api/offers/:id", (req, res) => {
  const offerId = req.params.id;
  Offer.findById(offerId)
    .populate("offers")
    .then((offer) => {
      console.log("offer found based on ID", offer);
      res.status(200).json(offer);
    })
    .catch((error) => {
      console.error(error, "an error prevented from retrieving the offer ID");
      res.status(500).json({ error });
    });
});

// put so we can edit parts of our offers
router.put("/api/offers/:id", (req, res) => {
  const offerId = req.params.id;

  Offer.findByIdAndUpdate(offerId, req.body, { new: true })
    .then((updatedOffer) => {
      console.log("updated offer! ->", updatedOffer);
      res.status(200).json(updatedOffer);
    })
    .catch((error) => {
      console.error("update unsuccessful", error);
      res.status(500).json({ error: "internal server error" });
    });
});

// Delete so we can delete our offers
router.delete("/api/offers/:id", (req, res) => {
  Offer.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("the offer was deleted");
      res.status(204).json();
    })
    .catch((error) => {
      console.error("offer could not be deleted", error);
      res.status(500).json({ error });
    });
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
