import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems } from '../../features/CartSlice/Cartslice.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ShopCard = ({ product, getProductDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.authen);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAddToCart = (getId, productName) => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    console.log("Add to Cart clicked for product ID:", getId);
    dispatch(addToCart({ userId: user.id, productId: getId, quantity: 1 }))
      .then(data => {
        if (data?.payload?.success) {
          toast.success(`"${productName}" added to cart successfully!`, {
            autoClose: 2000,
          });
          dispatch(fetchCartItems(user.id));
        } else {
          toast.error(`Failed to add "${productName}" to cart.`);
        }
      })
      .catch(() => {
        toast.error("An error occurred while adding the item.");
      });
  };

  return (
    <>
      <div>
        <div onClick={() => getProductDetails(product._id)} className='cursor-pointer lg:w-[220px] w-[270px] text-black max-w-sm mt-3 flex flex-col md:w-[200px]'>
          <div className='relative overflow-hidden rounded-lg'>
            <img 
              src={product.image} 
              alt="product" 
              className='w-full h-[280px] hover:scale-110 transition-transform object-contain duration-500 ease-in-out'
            />
          </div>
          <div className='text-sm mt-4 flex justify-between items-center'>
            <h2 className='font-bold text-xl text-gray-700'>{capitalizeFirstLetter(product.title)}</h2>
            <span className='text-slate-800 font-bold text-lg'>${product.price}</span>
          </div>
          <div className='flex justify-between items-center '>
            <span className='text-gray-800'>{capitalizeFirstLetter(product.category)}</span>
            <span className='text-gray-800'>{capitalizeFirstLetter(product.brand)}</span>
          </div>
          <div className='flex justify-center gap-3 items-center mt-2'>
            <button className='text-black text-sm px-2 py-1 border w-6 flex items-center justify-center h-6 rounded-full hover:bg-red-500 hover:text-white transition-transform duration-150 ease-in-out active:scale-90'>-</button>
            <span className='text-black text-sm'>1</span>
            <button className='text-black w-6 flex items-center justify-center h-6 text-sm px-2 py-1 rounded-full hover:bg-green-400 border hover:text-white transition-transform duration-150 ease-in-out active:scale-90'>+</button>
          </div>
        </div>
        <div onClick={() => handleAddToCart(product._id, product.title)} className='flex justify-end mt-4'>
          <button disabled={isLoading} className='w-full p-2 text-white border bg-slate-900 hover:bg-gray-800 hover:text-white rounded-lg text-sm transform transition-transform duration-150 ease-in-out active:scale-90'>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
