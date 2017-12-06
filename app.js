const express = require('express');
const app = express();
const morgan = require('morgan');
const products = require('./api/routes/products');
const orders = require('./api/routes/orders');

app.use(morgan('dev'));
app.use('/products',products);
app.use('/orders',orders);

app.use((req,res,next)=>{
	const error = new Error('Not Found!!');
	error.status = 404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500).json({
		error : {
			message : error.message
		}
	});
});


module.exports = app;