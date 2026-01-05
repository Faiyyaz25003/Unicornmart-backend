// // import express from "express";
// // import {
// //   registerUser,
// //   getUsers,
// //   updateUser,
// //   deleteUser,
// //   toggleBlockUser,
// //   loginUser,
// //   getUserById,
// // } from "../Controller/UserController.js";

// // const router = express.Router();

// // router.post("/register", registerUser);
// // // Login
// // router.post("/login", loginUser);
// // router.get("/", getUsers);

// // router.get("/:id", getUserById);


// // router.put("/:id", updateUser);
// // router.delete("/:id", deleteUser);
// // router.put("/block/:id", toggleBlockUser);



// // export default router;


// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getUsers,
//   updateUser,
//   deleteUser,
//   toggleBlockUser,
//   getMyProfile,
// } from "../Controller/userController.js";

// import { protectUser } from "../Middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // ✅ PROFILE (TOKEN BASED – BUYER / SELLER)
// router.get("/me", protectUser, getMyProfile);

// export default router;



import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleBlockUser,
  getMyProfile,
} from "../Controller/userController.js";

import { protectUser } from "../Middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Logged-in user profile (Buyer / Seller)
router.get("/me", protectUser, getMyProfile);


/* ================= USERS ================= */

// Get all users (Admin use)
router.get("/", protectUser, getUsers);

// Get user by ID
router.get("/:id", protectUser, getUserById);

// Update user
router.put("/:id", protectUser, updateUser);

// Delete user
router.delete("/:id", protectUser, deleteUser);

// Block / Unblock user
router.put("/block/:id", protectUser, toggleBlockUser);

export default router;
