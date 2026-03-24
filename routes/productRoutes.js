const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ➕ CREATE
router.post("/", createProduct);

// 📥 GET ALL (with filter)
router.get("/", getProducts);

// 📥 GET ONE
router.get("/:id", getSingleProduct);

// ✏️ UPDATE
router.put("/:id", updateProduct);

// ❌ DELETE
router.delete("/:id", deleteProduct);

module.exports = router;