const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // spokenLanguages: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     // required: true,
  //     ref: "Language",
  //   },
  // ],
  // hostedLanguages: [{ type: "String" }], // TODO: Also reference Language
  // location: { type: "String" },
});

module.exports = model("User", userSchema);
