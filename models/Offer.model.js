const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const offerSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },

  availableFrom: {
    type: Date,
    required: true,
  },

  availableUntil: {
    type: Date,
    required: true,
  },
  utilities: { type: [String], default: [] },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Offer", offerSchema);
//images? Yes!
