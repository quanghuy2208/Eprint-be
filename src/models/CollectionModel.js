const mongoose = require("mongoose");
const collectionSchema = new mongoose.Schema(
  {
    typeName: { type: String, required: true },
    typeSlug: { type: String, required: true },
    fileName: { type: String },
    fileLink: { type: String },
  },
  {
    timestamps: true,
  }
);
const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
