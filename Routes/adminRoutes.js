import express from "express";
import { registerAdmin, loginAdmin ,getAdmins, getAdminById} from "../Controller/adminController.js";
import { protectAdmin } from "../Middleware/authAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// 📌 Get Routes
router.get("/", getAdmins);          // Get all admins
router.get("/:id", getAdminById);    // Get admin by ID


// ✅ PROFILE (TOKEN BASED)
router.get("/profile", protectAdmin, (req, res) => {
  res.status(200).json(req.admin);
});


export default router;
