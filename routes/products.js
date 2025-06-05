import productSchema from "../models/products.js";
import Category from "../models/category.js";
import express from "express";
import validateObjectId from "../middleware/validateObjectsId.js";

const router = express.Router();

//basic fetching all products.
router.get(`/`, async (req, res) => {
  try {
    let products = await productSchema.find();
    return res.send(products);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

//Get a specific product by ID
router.get(`/:id`, validateObjectId, async (req, res) => {
  const product = await productSchema
    .findById(req.params.id)
    .populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

//Create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await productSchema.create({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      user: req.body.user,
      image: req.body.image,
      images: req.body.images,
      isFeatured: req.body.isFeatured,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Update a product by ID
router.put("/:id", validateObjectId, async (req, res) => {

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await productSchema.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      user: req.body.user,
      image: req.body.image,
      images: req.body.images,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) return res.status(500).send("the product cannot be updated!");

  res.send(product);
});

//Delete a product by ID
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const product = await productSchema.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;
