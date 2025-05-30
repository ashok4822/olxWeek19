const express = require('express');
const upload = require('../middleware/multer');
const router = express.Router();
const { addProduct, listProducts } = require('../controllers/productController');


router.get('/getproducts', listProducts)
router.post('/', upload.single('image'), addProduct);


module.exports = router;

