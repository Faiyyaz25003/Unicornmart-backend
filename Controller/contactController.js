import Contact from "../Models/contactModels.js";

export const createContact = async (req, res) => {
  try {
    const { companyName, contactPerson, email, phone, message } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({
      companyName,
      contactPerson,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET all contact enquiries
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};