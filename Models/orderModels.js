
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }, // added email field
    phone: { type: String, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    total: { type: Number, required: true }, // keep as required
  },
  { timestamps: true }
);

// Optional: Pre-save hook to automatically calculate total if not set
orderSchema.pre("save", function (next) {
  if (!this.total) {
    this.total = this.quantity * this.productPrice;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
