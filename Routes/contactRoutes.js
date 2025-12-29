import express from "express";
import { createContact, getContacts } from "../Controller/contactController.js";

const router = express.Router();

// POST /api/contact
router.post("/", createContact);

// GET /api/contact
router.get("/", getContacts);

export default router;
