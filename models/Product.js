const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    variants: [
      {
        ram: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
    image: String,
  },
  { timestamps: true }
);