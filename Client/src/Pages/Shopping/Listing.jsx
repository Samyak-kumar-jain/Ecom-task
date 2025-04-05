import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '../../Components/ui/dropdown-menu.jsx';
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ShopCard from '../../Components/Shopping/Shopcard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProductDetails,
  fetchAllFilteredProducts,
  fetchProductDetails
} from '../../features/Shopslice/Shopslice.js';
import ProductDetailsCard from '../../Components/Shopping/Product-details.jsx';

const Listing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [sort, setsort] = useState('price-lowtohigh');
  const [open, setOpen] = useState(false);

  const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ sortParams: sort }));
  }, [dispatch, sort]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true);
    }
  }, [productDetails]);

  const handleSort = (value) => {
    setsort(value);
  };

  const getProductDetails = (getProductId) => {
    dispatch(setProductDetails(null));
    dispatch(fetchProductDetails(getProductId));
  };

  return (
    <>
      <div className='p-4 md:p-6'>
        <div className='bg-background w-full rounded-lg shadow-sm'>
          <div className='p-4 border-b flex items-center justify-between flex-wrap gap-2'>
            <h2 className='text-xl font-extrabold'>All Products</h2>
            <div className='flex items-center gap-5'>
              <span className='text-muted-foreground'>{productList.length} Products</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='flex items-center gap-1 border-gray-400 rounded-md shadow-sm p-1 px-2 border'>
                    <ArrowUpDownIcon className='h-4 w-4' />
                    <span>Sort by</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        className="cursor-pointer"
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-20 p-4'>
            {productList.length > 0 ? (
              productList.map((product) => (
                <ShopCard getProductDetails={getProductDetails} key={product._id} product={product} />
              ))
            ) : (
              <span>No products found.</span>
            )}
          </div>
        </div>
      </div>

      <ProductDetailsCard open={open} setOpen={setOpen} productDetails={productDetails} />
    </>
  );
};

export default Listing;
