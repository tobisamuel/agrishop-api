const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "user ID is required" });

  const status = req.query.status ? req.query.status : "pending";

  const orders = await Order.find({ userId: req.params.id, status: status });

  if (!orders) return res.status(204).json({ message: "No Orders found" });

  res.json(orders);
};

const getOrder = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Order ID is required" });

  const order = await Order.findOne({ _id: req.params.id }).exec();

  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.params.id}.` });
  }

  res.json(order);
};

const createOrder = async (req, res) => {
  const { userId, products, amount, address } = req.body;

  if (!userId || !products || !amount || !address) {
    return res.status(400).json({ message: "Some data might be missing" });
  }

  try {
    const result = await Order.create({
      userId: userId,
      products: products,
      amount: amount,
      address: address,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateOrder = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const order = await Order.findOne({ _id: req.params.id }).exec();

  if (!order) {
    return res
      .status(204)
      .json({ message: `No order matches ID ${req.params.id}.` });
  }

  if (req.body?.status) order.status = req.body.status;

  const result = await order.save();
  res.json(result);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
};
