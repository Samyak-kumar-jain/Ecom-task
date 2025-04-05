import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog.jsx'

import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails } from '../../features/Shopslice/Shopslice.js';

// Optionally use a visually hidden component for accessibility
const VisuallyHidden = ({ children }) => (
  <span className="sr-only">{children}</span>
);

const ProductDetailsCard = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authen)
  const handleDialogClose = ()=>{
    setOpen(false);
    dispatch(setProductDetails())
    setRating(0);
    setReview("");

  }
  const [review, setReview] = useState("");
  const [rating,setRating] = useState(0);

  const handleRatingChange = (getRating)=>{
    setRating(getRating)
  }
  const handleAddReview = ()=>{
    dispatch(addReview({
      productId:productDetails?._id,
      userId:user?.id,
      userName:user?.userName,
      reviewMessage:review,
      reviewValue:rating,
    })).then(data=>{
      console.log(data)
    })

  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose} >
      <DialogContent className="flex flex-col sm:flex-row gap-8 sm:p-10 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] rounded-lg overflow-y-auto md:max-w-[96vw] h-[93vh] sm:h-auto" >
        {/* Visually hidden title for accessibility */}
        <DialogTitle>
          <VisuallyHidden>Product Details</VisuallyHidden>
        </DialogTitle>

        <div className="relative overflow-hidden rounded-lg  flex-shrink-0 md:mr-5 lg:mr-5">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            
            
            className="object-contain mx-auto "
          />
        </div>
        <div className="flex-1 bg-gray-100  p-3 rounded-md">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-lg font-extrabold text-gray-800">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 text-sm lg:text-lg md:text-md mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
        <p
          className={`text-2xl font-semibold text-primary text-gray-800 ${
            productDetails?.salesPrice > 0 ? "line-through" : ""
          }`}
        >
          ₹{productDetails?.price}
        </p>
        {productDetails?.salesPrice > 0 ? (
          <p className="text-3xl text-gray-600 font-bold text-muted-foreground">
            ₹{productDetails?.salesPrice}
          </p>
        ) : null}
      </div>
      <button  className='p-2 mt-6 mb-3  text-white border bg-slate-900 hover:bg-gray-800 hover:text-white rounded-md text-md transform transition-transform duration-150 ease-in-out active:scale-90 w-full'>
         Add to cart
        </button>
        
        
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsCard;
