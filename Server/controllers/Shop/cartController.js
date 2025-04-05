const mongoose = require('mongoose');

const Cart = require('../../Model/Cart')
const Product = require('../../Model/Product')

const addToCart = async(req,res)=>{
    try{
        const {userId,productId,quantity} = req.body;

        

        if(!userId || !productId || quantity<=0){
            return res.status(400).json({
                success:false,
                message:"invalid data provided",
            })
        }

        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found",
            })
        }
        let cart = await Cart.findOne({userId});

        if(!cart){
            cart = new Cart({
                userId,
                items:[],
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()=== productId)

        if(findCurrentProductIndex === -1){
            cart.items.push({productId, quantity})
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity

        }
        await cart.save();
        res.status(200).json({
            success:true,
            data:cart,
        })



    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }
}
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure userId is provided and valid
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing User Id"
            });
        }

        // Fetch cart and populate product details
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salesPrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        // Filter out items without a valid productId and format items
        const populatedCartItems = cart.items
            .filter(item => item.productId)
            .map(item => ({
                productId: item.productId._id,
                image: item.productId.image,
                title: item.productId.title,
                price: item.productId.price,
                salesPrice: item.productId.salesPrice,
                quantity: item.quantity,
            }));

        // If there are invalid items, update the cart
        if (populatedCartItems.length < cart.items.length) {
            cart.items = populatedCartItems;
            await cart.save();
        }

        // Respond with the updated cart document
        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populatedCartItems, // Override the items with populated items
            }
        });

    } catch (e) {
        console.error("Error in fetchCartItems:", e);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the cart items"
        });
    }
};


const upadteCartItems = async(req,res)=>{
    try{
        const {userId,productId,quantity} = req.body;
        if(!userId || !productId || quantity<=0){
            return res.status(400).json({
                success:false,
                message:"invalid data provided",
            })
        }
        let cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({
                success:false,
                message:"Cart not found"
            })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()=== productId)
        if(findCurrentProductIndex == -1){
            return res.status(404).json({
                success:false,
                message:"cart item is not present",
            })
        }
        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save();
       await cart.populate({
            path:"items.productId",
            select:"image title price salesPrice"
        })
        const populateCartItems = cart.items.map(item=> ({
            productId:item.productId? item.productId._id:null,
            image:item.productId? item.productId.image:null,
            title:item.productId ? item.productId.title:'product not found',
            price:item.productId? item.productId.price:null,
            salesPrice:item.productId?item.productId.salesPrice:null,
            quantity:item.quantity,
        }))
        res.status(200).json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItems,
            }

        })
        



    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error occured"
        })
    }
}
const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Validate userId and productId
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "User Id and Product Id are mandatory"
            });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salesPrice"
        });

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        // Filter out the item to be deleted
        cart.items = cart.items.filter(item => {
            return item.productId._id.toString() !== productId;
        });

        // Save the updated cart
        await cart.save();

        // Populate the cart items again
        await cart.populate({
            path: "items.productId",
            select: "image title price salesPrice"
        });

        // Map the populated cart items
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : 'product not found',
            price: item.productId ? item.productId.price : null,
            salesPrice: item.productId ? item.productId.salesPrice : null,
            quantity: item.quantity,
        }));

        // Respond with the updated cart data
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            }
        });

    } catch (error) { // Use error from the catch block
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
};

module.exports = {addToCart,upadteCartItems,fetchCartItems,deleteCartItem}
