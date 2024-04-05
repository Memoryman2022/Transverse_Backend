const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: { type: String, required: true }, //presentation
  description: { type: String, required: true }, // size, location, proximity to supermarket
  // location: { type: String, required: true }, // mapping TODO: Find out if String type or something else?
  // availableLanguages: [
  // {
  // type: mongoose.Schema.Types.ObjectId,
  // ref: "Language",
  // required: true,
  // default: [],
  // },
  // ],
  // availableFrom: {
  // type: Date,
  // required: true
  // },
  // first avail date
  // availableUntil: {
  // type: Date,
  // required: true
  // },
  // utilities: { type: [String], default: [] },
  email: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  host: { type: String, required: true },
});

module.exports = model("Offer", offerSchema);
//images? Yes!
