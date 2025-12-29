import Product from "../Models/ProductModels.js";
import { sendApprovalMail } from "../utils/sendMail/nodemailer.js";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);

    const product = await Product.create({
      ...req.body,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
export const getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

/* DELETE */
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

/* INTERESTED */
export const interestedProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.interestedUsers.push(req.body);
  await product.save();
  res.json(product);
};

/* APPROVE + EMAIL */
export const approveProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.status = "approved";
  await product.save();

  // email to seller
  await sendApprovalMail(req.body.email, product.scrapName);

  res.json({ message: "Product approved & mail sent" });
};
