import Order from "../Models/orderModels.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      quantity,
      address,
      productName,
      productPrice,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !quantity ||
      !address ||
      !productName ||
      !productPrice
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = Number(quantity) * Number(productPrice);

    // Save order
    const newOrder = await Order.create({
      name,
      email,
      phone,
      quantity,
      address,
      productName,
      productPrice,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ My Orders (User wise)
export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};
