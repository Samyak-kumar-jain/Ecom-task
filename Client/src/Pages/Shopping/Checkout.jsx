import React from 'react';
import image from '../../assets/account.jpg';
import { AddressForm } from '../../Components/Shopping/Address.jsx';
import { useSelector } from 'react-redux';
import CartContent from '../../Components/Shopping/CartContent.jsx';

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  console.log(cartItems, 'cartItems');
  
  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salesPrice > 0
            ? currentItem.salesPrice * currentItem.quantity
            : currentItem?.price * currentItem.quantity),
        0
      )
    : 0;

  return (
    <div className='flex flex-col'>
       <div className='relative h-[300px] w-full overflow-hidden'>
        <img
          src={image}
          className='h-full w-full object-cover object-center'
          alt='Checkout Banner'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <div className=''>
          <AddressForm />
        </div>
        <div className='flex flex-col gap-4 border border-gray-100 p-5 rounded-md  '>
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <CartContent key={item.productId} cartItems={item} />
            ))
          ) : (
            <div>No items in the cart.</div>
          )}

          {/* Total and Checkout Button */}
          <div className=' w-full'>
            <div className='font-bold justify-between flex mb-4'>
              <span className='font-bold text-gray-700 text-lg'>Total</span>
              <span className='font-bold text-gray-700 text-lg'>₹ {totalCartAmount.toFixed(2)}</span>
            </div>
            <button className='w-full p-3 bg-gray-800 rounded-lg text-white flex justify-center items-center'>
              Check Out with Paypal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
