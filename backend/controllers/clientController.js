const { addListener } = require("../Models/clientModel");
const Client = require("../Models/clientModel")
const Customer = require("../Models/customerModel")
const Order = require("../Models/orderModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const ApiFeatures = require("../utils/apifeatures");
exports.registerClient = catchAsyncError(async (req, res, next) => {
    const { name, email, password, username } = req.body;
    const client = await Client.create({
        name,
        email,
        password,
        username
    })
    console.log(req.body);
    // console.log("Controller")
    sendToken(client, 200, res);

});
exports.getClient = catchAsyncError(async (req, res) => {

    const client = await Client.findById(req.client.id)
    if (!client) {
        res.status(400);
    }
    res.status(200).json({
        success: true,
        client
    })
});

// get all the customers of a client
exports.getCustomersOfClient = catchAsyncError(async (req, res, next) => {
    const client_id = req.params.id;
    console.log(client_id);
    const customers = await Customer.find({ client_id });
    if (!customers) {
        return next(new ErrorHandler("No customers found", 400));
    }
    console.log(customers);
    res.status(200).json({
        success: true,
        customers
    })
})

// get all the orders of a customer of a client

exports.getOredersOfCustomerOfClient = catchAsyncError(async (req, res, next) => {
    const client_id = req.params.id;
    // console.log(client_id);
    const customers = await Customer.find({ client_id });
    if (!customers) {
        return next(new ErrorHandler("No customers found", 400));
    }
    const customer = await customers[0];
    const orderarr = await customer.orders;

    // console.log(orderarr[0]);

    const order = await Order.find({ _id: orderarr[0] });
    res.status(200).json({
        success: true,
        customer,
        order
    })
})
exports.loginClient = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));

    }
    const client = await Client.findOne({ email }).select("+password");

    if (!client) {
        return next(new ErrorHandler("Invalid username ", 401));

    }
    const isPasswordMatched = await client.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid or Email  password", 401));

    }

    sendToken(client, 200, res);
}
)
exports.getAllClients = catchAsyncError(async (req, res) => {
    const resultPerPage = 2
    const clientCount = await Client.countDocuments()

    const apiFeatures = new ApiFeatures(Client.find(), req.query).search()

    let clients = await apiFeatures.query

    let filteredClientCount = clients.length

    apiFeatures.pagination(resultPerPage);


     clients = await apiFeatures.query.clone();
    res.status(200).json({
        success: true,
        clients,
        clientCount,
        resultPerPage,
        filteredClientCount
    })
});


//logut client
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({

        success: true,
        message: "Logged out successfully"
    })
})

// Update Password Details

exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const client = await Client.findById(req.body.id).select("+password");

    client.password = req.body.newPassword,

    await client.save();

    res.status(200).json({

        success: true,
        message: "Password Change Successfully"
    })
})