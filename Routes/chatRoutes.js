import express from "express";
import { getChatsBetweenUsers } from "../Controller/messageController.js";

const router = express.Router();

// GET OLD CHATS
router.get("/:user1/:user2", getChatsBetweenUsers);

export default router;
