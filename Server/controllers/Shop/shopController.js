const Product = require('../../Model/Product')


const getFilteredProducts = async (req,res)=>{
    try{

        const {categories=[],brands=[] ,sortBy = "price-lowtohigh"} = req.query;
        let filters = {};

        if(categories.length){
            filters.categories = {$in:categories.split(',')};
        }
        if(brands.length){
            filters.brands = {$in:brands.split(',')};
        }

        let sort ={}
        switch (sortBy){
            case "price-lowtohigh":
                sort.price = 1
                break;
            case "price-hightolow":
                    sort.price = -1
                    break;
                    case "title-atoz":
                        sort.title = 1
                        break;
                        case "title-ztoa":
                sort.price = -1
                break;
                default:
                    sort.price = 1;
                    break;

        }
        const products =  await Product.find(filters).sort(sort);

        
        res.status(200).json({
            success: true,
            data :products
        })

    }catch(e){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"some error occured"

        })
    }

}
const getProductDetails = async (req, res) => {
  try {
      const productId = req.params.id; 
      console.log(productId)// Get the product ID from the request parameters
      const product = await Product.findById(productId); // Fetch the product from the database

      if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, data: product });
  } catch (error) { // Catch block with correctly defined error variable
      console.log(error); // Log the error
      res.status(500).json({ success: false, message: "Some error occurred" });
  }
};


module.exports = {getFilteredProducts, getProductDetails};