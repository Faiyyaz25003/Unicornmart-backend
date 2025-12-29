import express from "express";
import { createOrder, getOrders } from "../Controller/orderController.js";

const router = express.Router();

// Routes
router.post("/", createOrder);      // Create new order
router.get("/", getOrders);         // Get all orders (optional, admin)

export default router;
