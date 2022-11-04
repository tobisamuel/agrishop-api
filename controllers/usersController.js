const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  if (req.body?.firstName) user.firstName = req.body.firstName;
  if (req.body?.lastName) user.lastName = req.body.lastName;

  const result = await user.save();
  const formattedUser = format(result);

  res.json(formattedUser);
};

const deleteUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  const result = await User.deleteOne({ _id: req.params.id });
  res.json(result);
};

const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  if (!id || !oldPassword || !newPassword)
    return res.status(400).json({ message: "Some credentials are missing" });

  const user = await User.findOne({ _id: id }).select("+password").exec();
  if (!user) return res.sendStatus(401);

  const match = bcrypt.compare(oldPassword, user.password);

  if (match) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    const result = user.save();
    res.json({ message: "Password has been successfully changed" });
  } else {
    res.sendStatus(401);
  }
};

const getWishlist = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id })
    .populate("wishlist")
    .exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  const wishlist = user.wishlist;
  res.json(wishlist);
};

const addToWishlist = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches ID ${req.params.id}.` });
  }

  const { product_id } = req.body;
  if (!product_id)
    return res.status(400).json({ message: "Product ID is missing" });

  try {
    user.wishlist.push(product_id);
    await user.save();
    res.status(200).json({ status: 200, message: `Item added to wishlist!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID parameter is required" });
  }
  if (!req?.body?.id)
    return res.status(400).json({ message: "Product ID is missing" });

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { wishlist: req.body.id } }
    ).exec();

    res.json({ status: 200, message: `Item removed from wishlist!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function format(user) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  };
}

module.exports = {
  addToWishlist,
  deleteUser,
  getUser,
  getWishlist,
  removeFromWishlist,
  updateUser,
  changePassword,
};

// const getAddresses = async (req, res) => {
//   if (!req?.params?.id)
//     return res.status(400).json({ message: "User ID is required" });

//   const user = await User.findOne({ _id: req.params.id })
//     .populate("wishlist")
//     .exec();

//   if (!user) {
//     return res
//       .status(204)
//       .json({ message: `No User matches ID ${req.params.id}.` });
//   }

//   const addresses = user.addresses;
//   res.json(addresses);
// };

// const postAddress = async (req, res) => {
//   if (!req?.params?.id)
//     return res.status(400).json({ message: "User ID is required" });

//   const user = await User.findOne({ _id: req.params.id }).exec();

//   if (!user) {
//     return res
//       .status(204)
//       .json({ message: `No User matches ID ${req.params.id}.` });
//   }

//   const { firstName, lastName, phoneNumber, address, city, state, zip } =
//     req.body;

//   if (
//     !firstName ||
//     !lastName ||
//     !phoneNumber ||
//     !address ||
//     !city ||
//     !state ||
//     !zip
//   ) {
//     return res.status(400).json({ message: "Some data might be missing" });
//   }

//   try {
//     user.addresses.push({
//       firstName: firstName,
//       lastName: lastName,
//       phoneNumber: phoneNumber,
//       address: address,
//       city: city,
//       state: state,
//       zip: zip,
//     });

//     const result = await user.save();
//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//   }
// };
