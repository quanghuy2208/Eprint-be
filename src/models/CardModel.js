const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    products: { type: [mongoose.Schema.Types.ObjectId], required: true },
  },
  {
    timestamps: true,
  }
);

// Tạo compound index cho user_id và products
CardsSchema.index({ user_id: 1, products: 1 }, { unique: true });

const Cards = mongoose.model("Cards", CardsSchema, "cards");
module.exports = Cards;
