const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    name: {
        type: String
    },
    address: String,
    date: Date,
    contactno: Number,
    drname:String,
    draddress:String,
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    orders: [{
        Order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    }],


});



module.exports = mongoose.model("Customer", customerSchema);