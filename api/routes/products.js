const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');
//GET THE LIST OF ALL THE PRODUCTS
router.get('/',(req,res,next)=>{

	Product.find({})
	.select('name price _id')
	.exec()
	.then(results => {
		// console.log(results);
		const response = {
			count : results.length,
			products : results.map(result => {
				return {
					name : result.name,
					price : result.price,
					_id : result._id,
					url : {
						type : 'GET',
						url : 'http://localhost:3999/products/'+result._id
					}
				}
			})
		}
		// if(results.length>=0){
			res.status(200).json(response);
		// }
		// else {
			// res.status(404).json({message : 'No valid entries are found to exist!'});
		// }
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({error : err});
	});

});
//ADD A PRODUCT TO THE SHOPPPING CART
router.post('/',(req,res,next)=>{

	//create the product instance with the details that the client provided
	const product = new Product({
		_id : new mongoose.Types.ObjectID,
		name : req.body.name,
		price : req.body.price
	});

	product.save().then(result => {
		console.log(result);
		res.status(201).json({
			message : 'Handling POST requests to /products',
			createdProduct : {
				_id : result._id,
				name : result.name,
				price : result.price,
				request : {
					type : 'GET',
					url : 'http://localhost:3999/products/' + result._id
				}
			}
	});

	}).catch(err => {
		console.log(err);
		res.status(500).json({error : err});
	});
});
//RETRIEVE A SPECIFIC PRODUCT 
router.get('/:productId',(req,res,next)=>{

	const id = req.params.productId;

	Product.findById(id).select('name price _id')
	.exec()
	.then(doc => {
		console.log(doc);
		if(doc){
			res.status(200).json({
			 product : doc,
			 request : {
			 	type : 'GET',
			 	description: 'GET_ALL_PRODUCTS',
			 	url : 'http://localhost:3999/products'
			 }
			});
		}
		else {
			res.status(404).json({message : 'No valid ID found!!'});
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({error : err})
	});

});

//PATCH REQUEST TO UPDATE A PART OF SOME PRODUCT

router.patch('/:id',(req,res,next)=>{
	
	//Simple object keeps track of the update operations
	const updateOps  = {};
	//Loop over the req.body
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}

	Product.findByIdAndUpdate(req.params.id,{ $set : updateOps})
		.exec().then(result => {
			console.log(result);
			res.status(200).json({
				message : 'Product Updated',
				request : {
					type : 'GET',
					url : 'http://localhost:3999/products/'+result._id
				}
			});
		}).catch(err => {
			console.log(err);
			res.status(500).json({error : err});
		});

});


//DELETE THE PRODUCT WITH SPECIFIC ID

router.delete('/:id',(req,res,next)=>{
	const id = req.params.id
	Product.remove({_id : id}).exec().then(result => {
		console.log(result);
		res.status(200).json({
			message : 'Product Deleted',
			request : {
				type : 'POST',
				url : 'http://localhost:3999/products',
				data : {
					name : 'String',
					price : 'Number'
				}
			}
		});
	})
	.catch(err => {
		console.log(err);
		res.status.json({error : err});
	});

});

module.exports= router;