import categorySchema from "../models/category.js";

export const getAllCategories = async (req, res) => {
  const categoryList = await categorySchema.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await categorySchema.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.send(category);
  } catch (err) {
    res.status(500).send("Invalid ID or server error");
  }
};

export const createCategory = async (req, res) => {
  //More verbose but flexible than .create (used in products)
  let category = new categorySchema({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("the category cannot be created");
  }

  res.send(category);
};

export const updateCategory = async (req, res) => {
  const category = await categorySchema.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true } //Return the updated document after the update, not the old one.
  );
  if (!category) {
    return res.status(404).send("the category cannot be created");
  }

  res.send(category);
};

/*
If you're exposing a DELETE endpoint like /api/categories/:id, make sure:
Users are authenticated and authorized to delete (e.g., admin only).
You validate the id (e.g., check it’s a valid MongoDB ObjectId).
*/

export const deleteCategory = async (req, res) => {
 try {
    const category = await categorySchema.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "category not found!" });
    }
    res
      .status(200)
      .json({ success: true, message: "the category is deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};