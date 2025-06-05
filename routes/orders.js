import express from "express";
import Order from "../models/orders.js";
import User from '../models/user.js';
import validateObjectId from "../middleware/validateObjectsId.js";
import OrderItem from '../models/orderItem.js'; 

const router = express.Router();


//Get all orders
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

//Get a specific order by ID (with product details populated)
router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.send(order);
})


//Create an order
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
});

//Update an order (status or customer info)#

router.put("/:id", validateObjectId, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        shippingAddress1: req.body.shippingAddress1,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        user: req.body.user,
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).send("Order not found");

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Delete an order and associated OrderItem without orphans
router.delete("/:id", validateObjectId, async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send("Order not found");

    // Delete related order items
    await Promise.all(
      order.orderItems.map(orderItemId => OrderItem.findByIdAndDelete(orderItemId))
    );

    // Delete the order itself
    await order.deleteOne();

    res.json({ success: true, message: "Order and associated items deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
