const User = require("../models/User");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ message: "Some credentials are missing" });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: `User with this email has already been created.` });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ status: 201, message: `New user created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewVendor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    businessName,
    businessAddress,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !businessName ||
    !businessAddress
  )
    return res.status(400).json({ message: "Some credentials are missing" });

  const duplicate = await Vendor.findOne({ email: email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: `Vendor with this email has already been created.` });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await Vendor.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      businessName: businessName,
      businessAddress: businessAddress,
    });

    res.status(201).json({ status: 201, message: `New vendor created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNewUser, createNewVendor };
