import mongoose from "mongoose";

/* will work for products, categories, users, or any route that uses a 
MongoDB ObjectId as a URL parameter. */

export default function validateObjectId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID");
  }
  next();
}