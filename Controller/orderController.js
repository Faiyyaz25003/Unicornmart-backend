import Order from "../Models/orderModels.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { name, phone, quantity, address, productName, productPrice } = req.body;

    const total = quantity * productPrice;

    const newOrder = new Order({
      name,
      phone,
      quantity,
      address,
      productName,
      productPrice,
      total,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (optional, for admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
