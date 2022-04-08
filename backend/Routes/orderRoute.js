const { Router } = require("express");
const express = require("express");
const { isAuthenticatedClient, authRole } = require("../middleware/auth");
const { getAllOrders, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/orders").get(getAllOrders);
router.route("/orders/new/:customerid").post(createOrder);
router.route("/orders/:id").put(updateOrder).delete(isAuthenticatedClient ,deleteOrder);


module.exports = router;