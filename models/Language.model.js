const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const languageSchema = new Schema({
  languageName: { type: "String", required: true, unique: true }, // Spanish
  languageCode: { type: "String", required: true, unique: true }, // es
  languageFamily: { type: "String" }, // Romance
});

module.exports = model("Language", languageSchema);
