import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["buyer", "seller"], required: true },
    name: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String,

    shopName: String,
    businessType: String,
    gstNumber: String,
    joinDate: Date,

    password: String,
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
