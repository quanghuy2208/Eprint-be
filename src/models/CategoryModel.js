const mongoose = require("mongoose");

const categoryProductSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  console.log("bbbbbbbbbbbbbb")
  const CategoryProduct = mongoose.model("CategoryProduct", categoryProductSchema);

module.exports = CategoryProduct;

