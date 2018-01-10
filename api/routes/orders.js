//author - Prateek Madaan
//routes for the orders
// Here I have changed the old code and added controllers

const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

//Handle incoming get request to /orders
router.get('/',checkAuth,OrdersController.findAllOrders);

//Handle incoming post request to /orders
router.post('/',checkAuth,OrdersController.createOrder);

//Handle incoming get request to /:orderId
router.get('/:orderId',checkAuth,OrdersController.getOrderById);

//Handle incoming delete request for the order
router.delete("/:orderId",checkAuth,OrdersController.deleteOrderById);

module.exports = router;




