const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema(
    {
      user_id: { type: String, required: true },
      products: [
        {
          products_id: { type: String, required: true },
          quantity: { type: Number, required: true }
        }
      ],
    },
    {
      timestamps: true,
    }
  );
  

// CardsSchema.index({ user_id: 1, products: 1 }, { unique: true });

const Cards = mongoose.model("Cards", CardsSchema, "cards");
module.exports = Cards;
