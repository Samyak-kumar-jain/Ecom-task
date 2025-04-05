const { handleIMageUpload } = require("../../Config/Cloudinary");

const Product = require('../../Model/Product')

const handleImgUpload = async (req,res) =>{
    try{
        const b64 = Buffer.from(req.file.buffer).toLocaleString('base64');
        const url = "data:" + req.file.mimetype +";base64," + b64;
        const result = await handleIMageUpload(url);
        res.json({
            success:true,
            result,
        })


    }catch{
       console.log(error);
       res.json({
        success : false,
        message : 'error occured'
       }) 
    }
}

const addProduct = async (req,res)=>{
    try{
        const { image,title,description,category,brand,price,salesPrice,totalStock} = req.body;

        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salesPrice,
            totalStock
        })
        await newProduct.save();
        res.status(201).json({
            success:true,
            data:newProduct
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured"
        })

    }

}

const fetchAllProducts = async (req, res) => {
    try {
        const productList = await Product.find({});
        return res.status(200).json({
            success: true,
            data: productList
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred"
        });
    }
};

const editProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const { image,title,description,category,brand,price,salesPrice,totalStock} = req.body;
       
        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(404).json({
            success:false,
            message:"product not found"
        })

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salesPrice = salesPrice || findProduct.salesPrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({
            succes:true,
            data: findProduct
        })



    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"error occured"
        })

    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred"
        });
    }
};

module.exports = {handleImgUpload, fetchAllProducts,addProduct,editProduct,deleteProduct}