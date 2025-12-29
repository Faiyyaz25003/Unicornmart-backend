import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  toggleBlockUser,
  loginUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.post("/register", registerUser);
// Login
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/block/:id", toggleBlockUser);

export default router;
