import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
