const bcrypt = require("bcrypt");
const Vendor = require("../models/Vendor");

const getVendor = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Vendor ID is required" });

  const vendor = await Vendor.findOne({ _id: req.params.id }).exec();

  if (!vendor) {
    return res
      .status(204)
      .json({ message: `No Vendor matches ID ${req.params.id}.` });
  }

  res.json(vendor);
};

const updateVendor = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const vendor = await Vendor.findOne({ _id: req.params.id }).exec();

  if (!vendor) {
    return res
      .status(204)
      .json({ message: `No Vendor matches ID ${req.params.id}.` });
  }

  if (req.body?.firstName) vendor.firstName = req.body.firstName;
  if (req.body?.lastName) vendor.lastName = req.body.lastName;
  if (req.body?.email) vendor.email = req.body.email;
  if (req.body?.phoneNumber) vendor.phoneNumber = req.body.phoneNumber;
  if (req.body?.businessName) vendor.businessName = req.body.businessName;
  if (req.body?.businessAddress)
    vendor.businessAddress = req.body.businessAddress;
  if (req.body?.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    vendor.password = hashedPassword;
  }

  const result = await vendor.save();
  res.json(result);
};

const deleteVendor = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Vendor ID is required" });

  const vendor = await Vendor.findOne({ _id: req.params.id }).exec();

  if (!vendor) {
    return res
      .status(204)
      .json({ message: `No Vendor matches ID ${req.params.id}.` });
  }

  const result = await Vendor.deleteOne({ _id: req.params.id });
  res.json(result);
};

const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  if (!id || !oldPassword || !newPassword)
    return res.status(400).json({ message: "Some credentials are missing" });

  const vendor = await Vendor.findOne({ _id: id }).exec();
  if (!vendor) return res.sendStatus(401);

  const match = bcrypt.compare(oldPassword, vendor.password);

  if (match) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    const result = user.save();
    res.json({ message: "Password has been successfully changed" });
  } else {
    res.sendStatus(401);
  }
};

function format(vendor) {
  return {
    id: vendor._id,
    email: vendor.email,
    firstName: vendor.firstName,
    lastName: vendor.lastName,
    username: vendor.username,
  };
}

module.exports = {
  deleteVendor,
  getVendor,
  updateVendor,
  changePassword,
};
