const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //
  rating: { type: Number, required: true, min: 1, max: 5 }, // quality of hosts
  comments: { type: String, required: true }, //from guest about host
  //commentDate: { type: Date, default: Date.now }, //when the comment was created
});

module.exports = model("Review", reviewSchema);
