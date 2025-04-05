import { deleteCartItem, updateCartQuantity } from '../../features/CartSlice/Cartslice.js';
import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CartContent = ({cartItems}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authen)

  const handleDelete =(getId)=>{
    console.log("Deleting item with ID:", getId); // Debugging line

    dispatch(deleteCartItem({userId:user.id ,productId:getId}))

  }
  const handleUpdateCartQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction === "minus" && getCartItem.quantity === 1) {
      return; // Prevent reducing the quantity below 1
    }
    dispatch(updateCartQuantity({
      userId: user.id,
      productId: getCartItem.productId,
      quantity: typeOfAction === "plus" ? getCartItem.quantity + 1 : getCartItem.quantity - 1,
    }));
  };


  return (
    <div className='flex items-center space-x-4 border border-gray-100 p-2 rounded-lg shadow-sm '>
      <img src={cartItems.image} alt={cartItems.title} className='w-10 h-10 lg:w-20 lg:h-20  object-contain md:w-16 md:h-16'></img>
      <div className='flex-1'>
        <h3 className='font-bold text-gray-700 text-sm'>{cartItems.title}</h3>
        <div className='flex items-center mt-2 gap-3 '>
          <button className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-red-400 hover:text-white'>
            <Minus onClick={()=>handleUpdateCartQuantity(cartItems,"minus")} className='w-3 h-3'></Minus>
            <span className='sr-only'>Decrease</span>
          </button>
          {cartItems.quantity}
          <button onClick={()=>handleUpdateCartQuantity(cartItems,"plus")} variant="outline " size="icon" className='h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-400 hover:text-white'>
           <Plus className='w-3 h-3'></Plus>
            <span className='sr-only'>Decrease</span>
          </button>
        </div>

      </div>
      <div className='flex flex-col items-end'>
        <p className='font-bold'>₹{(cartItems.salesPrice >0 ?cartItems.salesPrice:cartItems.price * cartItems.quantity).toFixed(2)}</p>
        <button onClick={()=>handleDelete(cartItems.productId)}>
        <Trash  className='cursor-pointer mt-1 w-4 h-4 hover:text-red-500'></Trash>
        </button>
       
      </div>
    </div>
  )
}

export default CartContent