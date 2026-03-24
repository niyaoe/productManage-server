const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  variants: [
    {
      ram: String,
      price: Number,
      qty: Number,
    },
  ],
  image: String,
});

module.exports = mongoose.model("Product", productSchema);