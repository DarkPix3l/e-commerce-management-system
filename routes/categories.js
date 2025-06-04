import categorySchema from "../models/categories.js";
import express from "express";

const router = express.Router();


router.get ('/', async (req, res) =>{
    const categoryList = await categorySchema.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
});

router.post('/' , async(req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if(!category){
        return res.status(404).send('the category cannot be created')
    }

    res.send(category);
});



export default router;