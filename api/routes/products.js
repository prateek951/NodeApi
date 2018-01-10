const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
	destination: (req, file,cb) => cb(null,'./uploads'),
	filename : (req,file,cb) => cb(null,new Date().toISOString()+file.originalname);
});

const fileFilter = (req, file,cb)=>{

	//reject a file
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null, true);
	}
	else{
		cb(null,false);
	}
}

const upload = multer({
	storage : storage,
	limits : {
		fileSize : 1024*1024*5 
	},
	fileFilter : fileFilter
});

//Handle incoming request for retrieving the list of all the products
router.get('/',ProductsController.getProducts);

//Handle incoming request for posting a product and uploading its image using multer
router.post('/', checkAuth,upload.single('productImage'),ProductsController.createProduct);

//Handle incoming request for retrieving a single product by its id
router.get('/:productId',checkAuth,ProductsController.getProductById);

//Handle incoming request for updating a product
router.patch('/:productId',checkAuth,ProductsControllers.updateProductById);

//Handle incoming request for deleting a product 
router.delete('/:productId',checkAuth,ProductsController.deleteProductById);


module.exports = router;










