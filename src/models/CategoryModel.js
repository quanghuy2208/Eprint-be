const mongoose = require("mongoose");
console.log('bbbbbbbbb')
const categoryProductSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

  const CategoryProduct = mongoose.model("CategoryProduct", categoryProductSchema);


module.exports = CategoryProduct;

