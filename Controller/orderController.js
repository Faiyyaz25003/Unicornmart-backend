
import Order from "../Models/orderModels.js";
import { sendOrderConfirmation } from "../utils/sendMail/emailService.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { name, email, phone, quantity, address, productName, productPrice } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !quantity || !address || !productName || !productPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = Number(quantity) * Number(productPrice);

    // Create new order
    const newOrder = new Order({
      name,
      email,
      phone,
      quantity,
      address,
      productName,
      productPrice,
      total,
    });

    // Save order first
    await newOrder.save();

    // Try sending email
    try {
      await sendOrderConfirmation(email, newOrder);
      console.log(`Order confirmation email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // You can also send a warning in response but not fail the order
      return res.status(201).json({
        message: "Order placed successfully, but failed to send email",
        order: newOrder,
      });
    }

    // If email sent successfully
    res.status(201).json({
      message: "Order placed successfully and email sent",
      order: newOrder,
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (for admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
