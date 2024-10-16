const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(

  {
    name: { type: String, required: true, unique: true },
    typeName: { type: String, required: true },
    typeSlug: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
console.log(productSchema)
const Product = mongoose.model("Product", productSchema, "products");
console.log(productSchema)

module.exports = Product;
