const express = require('express');
const {addAdress,fetchAllAdress,deleteAdress,editAdress} = require('../../controllers/Shop/AdressContoller')
const router = express.Router();

router.post('/add',addAdress);
router.get('/get/:userId',fetchAllAdress);
router.delete('/delete/:userId/:addressId',deleteAdress);
router.put("/update/:userId/:addressId",editAdress);

module.exports=router;