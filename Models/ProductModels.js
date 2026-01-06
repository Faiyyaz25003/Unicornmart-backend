// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     scrapName: String,
//     category: String,
//     type: String,
//     quantity: Number,
//     price: Number,
//     condition: String,
//     pickupLocation: String,
//     pickup: String,
//     images: [String],

//     status: {
//       type: String,
//       enum: ["pending", "approved"],
//       default: "pending",
//     },

//     interestedUsers: [
//       {
//         email: String,
//         phone: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);



import mongoose from "mongoose";

const interestedUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    phone: String,
    role: String,
    interestedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    scrapName: String,
    price: Number,
    quantity: Number,
    category: String,
    type: String,
    location: String,
    images: [String],
    status: {
      type: String,
      default: "pending",
    },

    // ✅ NEW
    interestedUsers: [interestedUserSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
