import express from "express";
import validateObjectId from "../middleware/validateObjectsId.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();


router.get(`/`, getAllProducts);

//Get a specific product by ID
router.get(`/:id`, validateObjectId, getProductById);

//Create a new product
router.post("/", createProduct);

//Update a product by ID
router.put("/:id", validateObjectId, updateProduct);


//Delete a product by ID
router.delete("/:id", validateObjectId, deleteProduct);


export default router;
