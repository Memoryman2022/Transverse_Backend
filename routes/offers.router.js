const express = require("express");
const router = express.Router();

const Offer = require("./models/Offer.model");
const Location = require("./models/Location.model");

// post to create new offer
router.post("/offers", (req, res) => {});

// get all offers so we can search and find them <- Pierro
router.get("/offers", (req, res, next) => {
  Offer.find({})
    .populate("offers")
    .then((offers) => {
      res.json(offers);
    })
    .catch((error) => {
      next(error);
    });
});
// put so we can edit parts of our offers
router.put("/offers/:id", (req, res) => {
  const offerId = req.params.id;

  Offer.findByIdandUpdate(
    offerId,
    req.body,
    { new: true }
      .then((updateOffer) => {
        console.log("updated offer! ->", updateOffer);
        res.status(200).json(updateOffer);
      })
      .catch((error) => {
        console.error("update unsuccessful", error);
        res.status(500).json({ error: "internal server error" });
      })
  );
});
// Delete so we can delete our offers
router.delete("/offer/:id", (req, res) => {
  Offer.IdAndDelete(req.params.id)
    .then.l.then((result) => {
      console.log("the offer was deleted");
      res.status(204).json();
    })
    .catch((error) => {
      console.error("offer could not be deleted", error);
      res.status(500).json({ error });
    });
});

///Retreive all offers from given location

// route.get("offers/location/:locationId", (req, res, next) => {
//   const { locationId } = req.params;

//   Offers.find({ location: locationId })
//     .populate("location")
//     .then(offersByLocation=>{
//         if(!offersByLocation){
//             throw new //NEEEEEEED APP ERROR ("offer by location not found", 404);
//         }
//         res.status(200).json(offerByLocation)
//     })
//     .catch((error) =>{
//         next(error)
//     })
// });
