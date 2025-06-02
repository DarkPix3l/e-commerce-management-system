import { API_URL } from "./config/variable.js";
import { startDatabase } from "./config/db.js";
import express from "express";
import morgan from "morgan";
import productSchema from "./models/products.js";

//creating server
const app = express();
//Parse in json format
app.use(express.json());
app.use(morgan("tiny"));

const PORT = 3000;
startDatabase();

app.get(`${API_URL}/products`, async (req, res) => {
//basic fetching
   try {
    let products = await productSchema.find();
    return res.send(products);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
 
});

app.post(`${API_URL}/products`, async (req, res) => {
  /* console.log(productSchema);
  res.send(productSchema); */

  // Create a new object that follow its schema
  const whatever = await productSchema.create({
    title: "Example Product2",
    slug: "example-product2",
    description: "This is a description of the example product.",
    price: 18.99,
    instock: true,
    quantity: 15,
    imageUrl: "http://example.com/image2.jpg",
  });

whatever.save().then((createdProduct=>{
  res.status(201).json(createdProduct)
})).catch((err)=>{
  res.status(500).json({
    error: err,
    success:false
  })
})

});

/* running the server on */
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
