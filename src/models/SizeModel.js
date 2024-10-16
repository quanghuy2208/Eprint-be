const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String },
    size: { type: String},
  },
  {
    timestamps: true,
  }
);

const Size = mongoose.model("Size", sizeSchema, "size");
module.exports = Size;
