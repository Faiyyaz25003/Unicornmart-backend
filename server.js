// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js"
// import userRoutes from "./Routes/UserRoutes.js";
// import productRoutes from "./Routes/productRoutes.js";
// import adminRoutes from "./Routes/adminRoutes.js";
// import orderRoutes from "./Routes/orderRoutes.js";
// import contactRoutes from "./Routes/contactRoutes.js";
// import http from "http";
// import { Server } from "socket.io";


// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));


// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/contact", contactRoutes);


// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Socket logic
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Join room (userId)
//   socket.on("join", (userId) => {
//     socket.join(userId);
//     console.log(`User joined room: ${userId}`);
//   });

//   // Send message
//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     io.to(receiverId).emit("receiveMessage", {
//       senderId,
//       message,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/database.js";

// ROUTES
import userRoutes from "./Routes/UserRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";

// MODELS
import Message from "./Models/MessageModel.js";

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

// CREATE HTTP SERVER (IMPORTANT FOR SOCKET)
const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // JOIN ROOM BY USER ID
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User joined room: ${userId}`);
  });

  // SEND MESSAGE
  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    try {
      // SAVE MESSAGE TO DB
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
      });

      // SEND TO BOTH USERS
      io.to(senderId).emit("receiveMessage", newMessage);
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Message send error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// START SERVER (⚠️ server.listen, NOT app.listen)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
