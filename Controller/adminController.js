
import Admin from "../Models/adminModels.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken"; // <-- Import JWT
import { sendEmail } from "../utils/sendMail/nodemailer.js";


// Helper function to generate random password
const generatePassword = (length = 10) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

// Register new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Generate random password
    const password = generatePassword(8);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin in DB
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send email with username & password
    const emailText = `Hello ${name},\n\nYour admin account has been created.\n\nEmail: ${email}\nPassword: ${password}\n\nPlease login and change your password.`;
    await sendEmail(email, "Admin Account Created", emailText);

    res.status(201).json({
      message: "Admin registered successfully. Credentials sent to email.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
