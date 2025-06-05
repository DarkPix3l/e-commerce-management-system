import express from "express";
import validateCategory from "../middleware/validateCategory.js";
import validateObjectId from "../middleware/validateObjectsId.js";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories);


//READ
router.get("/:id", validateObjectId, getCategoryById);

//CREATE
router.post("/", validateCategory, createCategory);

//UPDATE
router.put("/:id", validateObjectId, updateCategory);

//DELETE
router.delete("/:id", validateObjectId, deleteCategory);

export default router;
