import React from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet.jsx';
import CartContent from './CartContent.jsx';
import { useNavigate } from 'react-router-dom';

const CartWrapper = ({ cartItems }) => {
  const navigate = useNavigate();
  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, currentItem) => 
        sum + (currentItem?.salesPrice > 0 
          ? currentItem.salesPrice * currentItem.quantity 
          : currentItem?.price * currentItem.quantity), 0
      )
    : 0;

  return (
    <SheetContent className="max-w-md h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className='mt-8 space-y-4'>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartContent key={item.productId} cartItems={item} />
          ))
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )}
      </div>
      
      {/* Move the total and checkout button here */}
      <div className='mt-8 space-y-4'>
        <div className='font-bold justify-between flex'>
          <span className='font-bold text-gray-700 text-lg'>Total</span>
          <span className='font-bold text-gray-700 text-lg'>₹ {totalCartAmount}</span>
        </div>
        <button 
        onClick={()=>navigate('/shop/checkout')}
          className='w-full p-2 text-white border bg-slate-900 hover:bg-gray-800 hover:text-white rounded-md text-sm transform mt-3 transition-transform duration-150 ease-in-out active:scale-90'>
          
          Checkout
        </button>
      </div>
    </SheetContent>
  );
}

export default CartWrapper;
