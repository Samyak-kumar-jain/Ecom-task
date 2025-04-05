const express = require('express')
const {addToCart,fetchCartItems,deleteCartItem,upadteCartItems} = require('../../controllers/Shop/cartController')


const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems);
router.put('/update-cart', upadteCartItems);
router.delete('/:userId/:productId', deleteCartItem)

 
module.exports = router;