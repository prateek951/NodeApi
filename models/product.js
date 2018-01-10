// How should the product look in my application

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

	_id : mongoose.Schema.Types.ObjectId,

	name : {
		type : String,
		required : true
	},
	price : {
		type : Number,
		required : true
	},
	productImage : {
		type : String,
		required : true
	}

});

//export the model for the product
module.exports = mongoose.model('Product',productSchema);