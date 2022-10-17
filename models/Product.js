const cuid = require("cuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    _id: { type: String, default: cuid },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    vendor: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", productSchema);
