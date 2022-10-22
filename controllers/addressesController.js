const Address = require("../models/Address");

const getAllAddresses = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "user ID is required" });

  const addresses = await Address.find({ userId: req.params.id });

  if (!addresses)
    return res.status(204).json({ message: "No addresses found" });

  res.json(addresses);
};

const getAddress = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "address ID is required" });

  const address = await Address.findOne({ _id: req.params.id }).exec();

  if (!address) {
    return res
      .status(204)
      .json({ message: `No address matches ID ${req.params.id}.` });
  }

  res.json(address);
};

const createAddress = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    phoneNumber,
    address,
    city,
    state,
    zip,
  } = req.body;

  if (
    !userId ||
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !address ||
    !city ||
    !state ||
    !zip
  ) {
    return res.status(400).json({ message: "Some data might be missing" });
  }

  try {
    const result = await Address.create({
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      state: state,
      zip: zip,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateAddress = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const address = await Address.findOne({ _id: req.params.id }).exec();

  if (!address) {
    return res
      .status(204)
      .json({ message: `No address matches ID ${req.params.id}.` });
  }

  if (req.body?.firstName) address.firstName = req.body.firstName;
  if (req.body?.lastName) address.lastName = req.body.lastName;
  if (req.body?.phoneNumber) address.phoneNumber = req.body.phoneNumber;
  if (req.body?.address) address.address = req.body.address;
  if (req.body?.city) address.city = req.body.city;
  if (req.body?.state) address.state = req.body.state;
  if (req.body?.zip) address.zip = req.body.zip;

  const result = await address.save();
  res.json(result);
};

const deleteAddress = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "address ID is required" });

  const address = await Address.findOne({ _id: req.params.id }).exec();

  if (!address) {
    return res
      .status(204)
      .json({ message: `No address matches ID ${req.params.id}.` });
  }

  const result = await Address.deleteOne({ _id: req.params.id });
  res.json(result);
};

module.exports = {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddress,
  updateAddress,
};
