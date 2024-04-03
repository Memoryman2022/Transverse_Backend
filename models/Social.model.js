const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const socialSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //guest=pic author
  image: { type: String, required: true },
  //likes: { type: Number, required: true },
  caption: { type: String, required: true },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectsId,
        ref: "User",
        required: true,
      },
    },
  ],
});

module.exports = model("Social", socialSchema);
