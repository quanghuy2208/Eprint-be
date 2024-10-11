const mongoose = require("mongoose");

const orderCustomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    material: { type: String, required: true },
    materialType: { type: String, required: true },
    size: { type: String, required: true },
    side: { type: Number, required: true },
    quantity: { type: Number, required: true },
    machining: { type: String },
    importFile: { type: String, required: false },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const OrderCustom = mongoose.model("OrderCustom", orderCustomSchema);

module.exports = OrderCustom;
