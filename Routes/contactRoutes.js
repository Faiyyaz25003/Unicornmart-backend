import express from "express";
import { createContact , getContacts} from "../Controller/contactController.js";

const router = express.Router();

router.post("/contact", createContact);

// GET – fetch all enquiries
router.get("/", getContacts);


export default router;
