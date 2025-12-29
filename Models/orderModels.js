import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
