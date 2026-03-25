const User = require("../models/User");

// ❤️ ADD / REMOVE (TOGGLE)
exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { productId } = req.body;

    const user = await User.findById(userId);

    const exists = user.wishlist.includes(productId);

    if (exists) {
      // remove
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      // add
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      message: exists ? "Removed from wishlist" : "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET USER WISHLIST
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};