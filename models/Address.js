const cuid = require("cuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  _id: { type: String, default: cuid },
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
});

module.exports = mongoose.model("Address", addressSchema);
