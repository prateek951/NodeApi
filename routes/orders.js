const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{

	res.status(200).json({
		message : 'Orders were fetched'
	})

});

//CREATING AN ORDER
router.post('/',(req,res,next)=>{

	const order = {
		productId : req.body.productId,
		quantity : req.body.quantity
	}
	res.status(200).json({
		message : 'Order was created',
		order
	});

});

//FETCH A SPECIFIC ORDER
router.get('/:id',(req,res,next)=>{

	res.status(200).json({
		message: 'Got the order for specified orderId',
		id : req.params.id
	})
});

//DELETE THE ORDER
router.delete('/:id',(req,res,next)=>{

	res.status(200).json({
		message: 'Order was successfully deleted!',
		id : req.params.id
	})
})

module.exports = router;