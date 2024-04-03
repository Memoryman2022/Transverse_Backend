const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: { type: String, required: true }, //presentation
  description: { type: String, required: true }, // size, location, proximity to supermarket
  location: { type: String, required: true }, // mapping
  availableLanguages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
      default: [],
    },
  ],
  availableFrom: { type: Date, required: true }, //first avail date
  availableUntil: { type: Date, required: true },
  utilities: { type: String, default: [] },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Offer", offerSchema);
//images?
