const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  spokenLanguages: [{ type: String }],
  hostedLanguages: [{ type: String }],
  location: { type: String },
  profileImage: { type: String, default: "" },
});

module.exports = model("User", userSchema);
