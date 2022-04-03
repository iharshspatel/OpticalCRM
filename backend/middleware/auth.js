const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const Client = require("../Models/clientModel")
exports.isAuthenticatedClient = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return next(new ErrorHandler("Please login to access this page", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.client = await Client.findById(decodedData.id);
    next();
});

exports.authRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.client.role)) {
            return next(new ErrorHandler(`Role: ${req.client.role} is not alowed to access this resource`, 403));
        }
        next();
    }
}