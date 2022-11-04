const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find();

  if (!products) return res.status(204).json({ message: "No products found" });

  res.json(products);
};

const getProduct = async (req, res) => {
  if (!req?.params?.slug)
    return res.status(400).json({ message: "Product ID is required" });

  const product = await Product.findOne({ slug: req.params.slug })
    .populate("vendor")
    .exec();

  if (!product) {
    return res
      .status(204)
      .json({ message: `No product matches ID ${req.params.slug}.` });
  }

  res.json(product);
};

const getVendorProducts = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Vendor ID is required" });

  const products = await Product.find({ vendorId: req.params.id });

  if (!products) return res.status(204).json({ message: "No products found" });

  res.json(products);
};

const createProduct = async (req, res) => {
  const { name, description, category, vendor, price, image, inStock } =
    req.body;

  if (
    !name ||
    !description ||
    !category ||
    !vendor ||
    !price ||
    !image ||
    !inStock
  ) {
    return res.status(400).json({ message: "Some data might be missing" });
  }

  try {
    const result = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      category: category,
      vendor: vendor,
      price: price,
      image: image,
      inStock: inStock,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }
  const product = await Product.findOne({ _id: req.params.id }).exec();

  if (!product) {
    return res
      .status(204)
      .json({ message: `No Product matches ID ${req.params.id}.` });
  }

  const { name, description, category, price, image, inStock } = req.body;

  if (name) product.name = name;
  if (name) product.slug = slugify(name);
  if (description) product.description = description;
  if (category) product.category = category;
  if (price) product.price = price;
  if (image) product.image = image;
  if (inStock) product.inStock = inStock;

  const result = await product.save();
  res.json(result);
};

const deleteProduct = async (req, res) => {
  if (!req?.params?.productId)
    return res.status(400).json({ message: "Product ID is required" });

  const product = await Product.findOne({ _id: req.params.productId }).exec();

  if (!product) {
    return res
      .status(204)
      .json({ message: `No Product matches ID ${req.params.productId}.` });
  }

  const result = await Product.deleteOne({ _id: req.params.productId });
  res.json(result);
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getVendorProducts,
  getProduct,
  updateProduct,
};
