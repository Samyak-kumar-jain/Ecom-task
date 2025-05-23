const express = require('express')
const router = express.Router()
const {getFilteredProducts,getProductDetails} = require('../../controllers/Shop/shopController')

router.get('/get', getFilteredProducts);
router.get('/get/:id', getProductDetails);
module.exports = router;