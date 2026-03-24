const express = require("express");
const router = express.Router();
const {
  addCategory,
  addSubCategory,
  getCategories,
} = require("../controllers/categoryController");

router.post("/", addCategory);
router.post("/sub", addSubCategory);
router.get("/", getCategories);

module.exports = router;