const cuid = require("cuid");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    _id: { type: String, default: cuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: emailSchema(),
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    businessName: { type: String, required: true, unique: true },
    businessAddress: { type: String, required: true },
    refreshToken: { type: String },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

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

module.exports = mongoose.model("Vendor", vendorSchema);
