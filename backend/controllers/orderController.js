const Order=require("../Models/orderModel")
const Customer = require("../Models/customerModel")
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncError")
exports.createOrder=catchAsyncError( async (req,res,next)=>{

    const order=await Order.create(req.body);

    res.status(201).json({
        success:true,
        order
    })
});
exports.getAllOrders=catchAsyncError( async (req,res)=>{
    const orders = await Order.find();
    res.status(200).json({
        success:true,
        orders
    })
});
exports.updateOrder=catchAsyncError( async (req,res,next)=>{
    let order= await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }
    order=await Order.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        order
    })
});
exports.deleteOrder=catchAsyncError( async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    console.log(order.id);
    // console.log(req.body.clientid)
    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }
    await order.remove()
    // const customer = await Customer.find({ "orders.Order":order.id})
    const data = await Customer.findOneAndUpdate({ "orders.Order":order.id }, { $pull: { orders:{ Order:order._id } }})
    // const customer = await Customer.find({ "orders.Order":order.id})
    console.log(data);
    data.save();
    res.status(200).json({
        success:true,
        message:"order deleted"
    })
});