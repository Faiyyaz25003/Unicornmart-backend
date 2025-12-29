import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js"
import userRoutes from "./Routes/UserRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
