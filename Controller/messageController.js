import Message from "../Models/MessageModel.js";
    
// GET OLD CHATS BETWEEN TWO USERS
export const getChatsBetweenUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const chats = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
};
