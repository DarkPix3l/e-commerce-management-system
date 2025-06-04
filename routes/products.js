import productSchema from "../models/products.js";
import express from "express";

const router = express.Router();

router.get(`/`, async (req, res) => {
  //basic fetching all products.
  try {
    let products = await productSchema.find();
    return res.send(products);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

router.post(`/`, async (req, res) => {
  // Leaving hardcoded product for testing
  const newProduct = await productSchema.create({
    title: "Example Product3",
    slug: "example-product3",
    description: "This is a description of the example product.",
    price: 11.44,
    instock: true,
    quantity: 45,
    imageUrl: "http://example.com/image3.jpg",
  });

  newProduct
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

export default router;
