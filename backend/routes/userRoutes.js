const express = require('express');
const { registerUser, loginUser, productList } = require('../controllers/userController');
const router = express.Router();


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/listproducts', productList);

module.exports = router;