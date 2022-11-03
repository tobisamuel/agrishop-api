const cuid = require("cuid");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  _id: { type: String, default: cuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
});

const userSchema = new Schema({
  _id: { type: String, default: cuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: emailSchema(),
  password: {
    type: String,
    required: true,
  },
  addresses: [addressSchema],
  wishlist: [
    {
      type: String,
      ref: "Product",
    },
  ],
  refreshToken: { type: String },
});

function emailSchema() {
  return {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address`,
    },
  };
}

module.exports = mongoose.model("User", userSchema);
