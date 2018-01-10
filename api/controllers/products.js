const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

	//retrieve the list of all the products
	Product.find()
	.select("name price _id productImage")
	.exec()
	.then(products => {
		const response = {
			count : products.length,
			products : products.map(product => {
				return {
					name : product.name,
					price : product.price,
					productImage : product.productImage,
					_id : product._id,
					request : {
						type : "GET",
						url : "http://localhost:3000/products/"+product._id
					}
				};
			})
		};
		res.status(200).json(response);
	})
	.catch(err => {
		// console.log(err);
		res.status(500).json({
			error : err
		});
	});
};

exports.createProduct = (req, res, next) => {
	//Create a new product
	const product = new Product({
		_id : new mongoose.Types.ObjectId,
		name : req.body.name,
		price : req.body.price,
		productImage : req.file.path
	});
	// Save the product to the database
	product.save()
	.then(result => //console.log(result);
	{
		//Provide the client with a link so that he can see the newly createad product	
		res.status(201).json({
			message : 'Product Created',
			createdProduct : {
				name : result.name,
				price : result.price,
				_id : result._id,
				request : {
					type : "GET",
					url : "http://localhost:3000/products/"+result._id
				}
			}
		})
	})
	.catch(err=> res.status(500).send({error : err}));
};

//Handle incoming request for retrieving a single product by its id
exports.getProductById = (req, res, next) => {
	Product.findById(req.params.productId)
	.select('name price _id productImage')
	.exec()
	.then(product => {
		if(product){
			res.status(200).json({
			product : product,
			request : {
				type : "GET",
				url : "http://localhost:3000/products"
			}
		})
		}
		else{
			res.status(404).json({
				message : 'No valid entry found for the provided Id'
			});
		}
	})
	.catch(err => res.status(500).json({error : err}));
}

//Handle incoming request for updating the product by its id
exports.updateProductById = (req, res, next) => {

	// Find the Product by the id
	const id =  req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}		
	Product.update({_id : id},{$set : updateOps})
	.exec()
	.then(result => {
		res.status(200).json({
			message: "Product Updated",
			request : {
				type : "GET",
				url : "http:localhost:3000/products/"+id
			}
		})
	})
	.catch(err => res.status(500).json({error : err}));
};

//Handle incoming request for deleting a product 
exports.deleteProductById = (req, res, next) => {

	//Find the product from its id
	Product.remove({_id : req.params.id})
	.exec()
	.then(result => {
		res.status(200).json({
			message : "Product Deleted",
			request : {
				type : "POST",
				url : "http://localhost:3000/products",
				body: {
					name: "String",
					price: "Number"
				}
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error : err
		});
	});
};