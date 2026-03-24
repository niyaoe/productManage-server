const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// ➕ Add Category
exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Add SubCategory
exports.addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const sub = await SubCategory.create({
      name,
      category: categoryId,
    });

    // push into category
    await Category.findByIdAndUpdate(categoryId, {
      $push: { subCategories: sub._id },
    });

    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get All Categories (with subcategories)
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find().populate("subCategories");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};