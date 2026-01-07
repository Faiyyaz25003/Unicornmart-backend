// import Product from "../Models/ProductModels.js";
// import { sendApprovalMail } from "../utils/sendMail/nodemailer.js";

// /* CREATE PRODUCT */
// export const createProduct = async (req, res) => {
//   try {
//     const images = req.files ? req.files.map(file => file.path) : [];

//     const product = await Product.create({
//       scrapName: req.body.scrapName,
//       category: req.body.category,
//       type: req.body.type,
//       quantity: req.body.quantity,
//       price: req.body.price,
//       condition: req.body.condition,
//       pickupLocation: req.body.pickupLocation,
//       pickup: req.body.pickup,
//       images,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// /* GET ALL */
// export const getAllProducts = async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   res.json(products);
// };

// /* UPDATE */
// export const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// };

// /* DELETE */
// export const deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// };


// /* INTERESTED PRODUCT */
// export const interestedProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     const { userId, name, email, phone, role } = req.body;

//     // ❌ Duplicate interest check
//     const alreadyInterested = product.interestedUsers.find(
//       (u) => u.userId?.toString() === userId
//     );

//     if (alreadyInterested) {
//       return res.status(400).json({ message: "Already interested" });
//     }

//     product.interestedUsers.push({
//       userId,
//       name,
//       email,
//       phone,
//       role,
//     });

//     await product.save();

//     res.status(200).json({
//       message: "Interest saved successfully",
//       interestedUsers: product.interestedUsers,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* GET ALL INTERESTED USERS (ADMIN PAGE) */
// export const getAllInterestedUsers = async (req, res) => {
//   try {
//     const products = await Product.find(
//       { "interestedUsers.0": { $exists: true } },
//       { scrapName: 1, interestedUsers: 1 }
//     );

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* APPROVE + EMAIL */
// export const approveProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   product.status = "approved";
//   await product.save();

//   // email to seller
//   await sendApprovalMail(req.body.email, product.scrapName);

//   res.json({ message: "Product approved & mail sent" });
// };



import Product from "../Models/ProductModels.js";
import { sendApprovalMail } from "../utils/sendMail/nodemailer.js";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.path) : [];

    const product = await Product.create({
      scrapName: req.body.scrapName,
      category: req.body.category,
      type: req.body.type,
      quantity: req.body.quantity,
      price: req.body.price,
      condition: req.body.condition,
      pickupLocation: req.body.pickupLocation,
      pickup: req.body.pickup,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
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


/* INTERESTED PRODUCT */
export const interestedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const { userId, name, email, phone, role } = req.body;

    // ❌ Duplicate interest check
    const alreadyInterested = product.interestedUsers.find(
      (u) => u.userId?.toString() === userId
    );

    if (alreadyInterested) {
      return res.status(400).json({ message: "Already interested" });
    }

    product.interestedUsers.push({
      userId,
      name,
      email,
      phone,
      role,
    });

    await product.save();

    res.status(200).json({
      message: "Interest saved successfully",
      interestedUsers: product.interestedUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL INTERESTED USERS (ADMIN PAGE) */
export const getAllInterestedUsers = async (req, res) => {
  try {
    const products = await Product.find(
      { "interestedUsers.0": { $exists: true } },
      { scrapName: 1, interestedUsers: 1 }
    );

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
