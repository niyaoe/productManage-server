const Product = require("../models/Product");

// ➕ CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, subCategory, variants, image } = req.body;

    const product = await Product.create({
      name,
      description,
      subCategory,
      variants,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET ALL PRODUCTS (with optional subcategory filter)
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 6, subCategory, search } = req.query;

    const query = {};

    // 🔍 search by name
    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive
    }

    // 📂 filter by subcategory
    if (subCategory) {
      query.subCategory = subCategory;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("subCategory");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};