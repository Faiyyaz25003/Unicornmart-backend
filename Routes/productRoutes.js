import express from "express";
import multer from "multer";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    interestedProduct,
    approveProduct,
} from "../Controller/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images", 10), createProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/interested", interestedProduct);
router.post("/:id/approve", approveProduct);

export default router;
