const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    name: { type: String },
    type_option: { type: String},
  },
  {
    timestamps: true,
  }
);

const Type = mongoose.model("Type", typeSchema, "type");
module.exports = Type;
