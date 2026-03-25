const express = require("express");
const router = express.Router();

const {
  toggleWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

const auth = require("../middleware/authMiddleware");

// ❤️ toggle
router.post("/", auth, toggleWishlist);

// 📥 get wishlist
router.get("/", auth, getWishlist);

module.exports = router;