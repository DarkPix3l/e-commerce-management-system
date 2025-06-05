import express from "express";
import validateObjectId from "../middleware/validateObjectsId.js";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

//Get all orders
router.get(`/`, getAllOrders);

//Get a specific order by ID (with product details populated)
router.get(`/:id`, validateObjectId, getOrderById);

//Create an order
router.post("/", createOrder);

//Update an order (status or customer info)
router.put("/:id", validateObjectId, updateOrder);

//Delete an order and associated OrderItem without orphans
router.delete("/:id", validateObjectId, deleteOrder);

export default router;
