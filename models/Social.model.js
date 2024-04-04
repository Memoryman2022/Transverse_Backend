const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const socialSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //guest=pic author
  image: { type: String },
  likes: { type: Number, required: true },
  caption: { type: String, required: true },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  postDate: { type: Date, default: Date.now },
});

module.exports = model("Social", socialSchema);
