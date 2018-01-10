// author - Prateek Madaan
// context - all the routes pertaining to orders

const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.findAllOrders = (req, res, next) => {

	//Retrieve the list of all the orders
	Order.find({})
	.select("product quantity _id")
	.populate("product","name")
	.exec()
	.then(orders => {
		res.status(200).json({
			orders : orders.map(order=> {
				_id : order._id,
				product : order.product,
				quantity : order.quantity,
				request : {
					type : "GET",
					url : "http://localhost:3000/orders/"+order._id
				}
			}),
			count : orders.length,
		});
	})
	.catch(err => res.status(500).json({
		error : err
	}));
};

export.createOrder = (req, res, next) => {

	// Check for the product for which you want to post an order
Product.findById(req.body.productId)
	.then(product => {
		if(!product){
			return res.status(404).json({
				message : 'Product Not Found'
			})
		}
		// Got the product 
		//create a new order
		const order = new Order({
			_id : mongoose.Types.ObjectId,
			quantity : req.body.quantity,
			product : req.body.quantity
		});
		return order.save();
	})
	.then(result => {
		// The result comes now
		// console.log(result);
		res.status(201).json({
			message : 'Order stored',
			createdOrder : {
				_id : result._id,
				product : result.product,
				quantity : result.quantity
			},
			request : {
				type : "GET",
				url : "http://localhost:3000/orders/"+result._id
			}
		})
	})
	.catch(err => {
		// console.log(err);
		res.status(500).json({error : err});
	});	
};

exports.getOrderById = (req, res, next) => {


	//Retrieve the order by id here
	Order.findById(req.params.orderId)
	.populate('product')
	.then(order => {
		if(!order){
			return res.status(404).json({
				message : 'Order Not Found'
			});
		}
		res.status(200).json({
			order : order,
			request : {
				type : "GET",
				url : "http://localhost:3000/orders"
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error : err
		});
	});
};


exports.deleteOrderById = (req, res, next) => {
	Order.remove({_id : req.params.orderId})
	.exec()
	.then(result => {
		res.status(200).json({
			message : "Order got deleted",
			request : {
				type : "POST",
				url : "http://localhost:3000/orders",
				body : {
					productId : "ID",
					quantity : "Number"
				}
			}
		});
	})
	.catch(err => res.status(500).json({error : err}));
};