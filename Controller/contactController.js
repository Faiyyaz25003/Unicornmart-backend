import Contact from "../Models/contactModels.js";

// CREATE contact
export const createContact = async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, message } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ companyName, contactPerson, email, phone, message });
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
