const cuid = require("cuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    _id: { type: String, default: cuid },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
