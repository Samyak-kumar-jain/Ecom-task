 const express = require('express');
 const router = express.Router();
 const {handleImgUpload, addProduct,fetchAllProducts,deleteProduct,editProduct} = require('../../controllers/Admin/Products_controller')
 const {upload} = require('../../Config/Cloudinary')

 router.post('/upload-image', upload.single('my_file'),handleImgUpload)
 router.post('/add',addProduct);
 router.put('/edit/:id',editProduct);
 router.delete('/delete/:id',deleteProduct);
 router.post('/add',addProduct);
 router.get('/get-All-Products', fetchAllProducts)


 module.exports = router;