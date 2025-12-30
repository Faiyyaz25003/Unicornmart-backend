import express from "express";
import { registerAdmin, loginAdmin } from "../Controller/adminController.js";
import { protectAdmin } from "../Middleware/authAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ✅ PROFILE (TOKEN BASED)
router.get("/profile", protectAdmin, (req, res) => {
  res.status(200).json(req.admin);
});


export default router;
