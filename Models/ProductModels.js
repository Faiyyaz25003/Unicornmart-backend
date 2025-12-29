import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    scrapName: String,
    category: String,
    type: String,
    quantity: Number,
    price: Number,
    condition: String,
    pickupLocation: String,
    pickup: String,
    images: [String],

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },

    interestedUsers: [
      {
        email: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
