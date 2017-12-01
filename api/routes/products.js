const express = require('express');
const router = express.Router();

//GET THE LIST OF ALL THE PRODUCTS
router.get('/',(req,res,next)=>{

	res.status(200).json({
		message : 'Hey it works!'
	})

});
//ADD A PRODUCT TO THE CART
router.post('/',(req,res,next)=>{

	res.status(200).json({
		message : 'Hey it works'
	})

});

//RETRIEVE A SPECIFIC PRODUCT 
router.get('/:id',(req,res,next)=>{

	const id = req.params.id;
	//PERFORM A SIMPLE CHECK FOR IF ID = special
	if(id === 'special'){

		res.status(200).json({
			message: 'Hey it works!!!'
		})
	}
	else {

		res.status(200).json({
			message: 'This is not special!!'
		})

	}
});

//PATCH REQUEST TO UPDATE A PART OF SOME PRODUCT

router.patch('/:id',(req,res,next)=>{

	res.status(200).json({
		message: 'Hey it works!! Updated the product!'
	})
});


//DELETE THE PRODUCT WITH SPECIFIC ID

router.delete('/:id',(req,res,next)=>{

	res.status(200).json({
		message : 'Hey it works!! Deleted The product!!'
	})
});

module.exports= router;