import express from "express";
import { createOrder, getOrders , getOrderById } from "../Controller/orderController.js";

const router = express.Router();

// Routes
router.post("/", createOrder);      // Create new order
router.get("/", getOrders);         // Get all orders (optional, admin)
router.get("/:id", getOrderById);      // ✅ Order By ID

export default router;
