const mongoose = require("mongoose");

const categoryProductSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );
  console.log(categoryProductSchema)
  const CategoryProduct = mongoose.model("CategoryProduct", categoryProductSchema);


module.exports = CategoryProduct;

