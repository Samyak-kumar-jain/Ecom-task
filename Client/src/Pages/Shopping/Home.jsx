import React, { useState, useEffect } from 'react';
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, FootprintsIcon, ShirtIcon, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '../../Components/ui/card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import ShopCard from '../../Components/Shopping/Shopcard.jsx';
import { fetchAllFilteredProducts } from '../../features/Shopslice/Shopslice.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const slides = [banner1, banner2, banner3]; 
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); // useNavigate hook for navigation

  const categories = [
    { label: "Men", id: "men", icon: ShirtIcon },
    { label: "FootWear", id: "footwear", icon: FootprintsIcon },
    { label: "Kids", id: "kids", icon: BabyIcon },
    { label: "Women", id: "women", icon: CloudLightningIcon },
    { label: "Accessories", id: "accessories", icon: WatchIcon },
  ];

  // Auto slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, [slides.length]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterCat: {}, filterBrand: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  const handlePrevSlide = () => {
    setCurrSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrSlide((prev) => (prev + 1) % slides.length);
  };

  const handleCategoryClick = (categoryId) => {
    // Navigate to the listing page with selected filters
    navigate('/shop/listing', { state: { filterCat: [categoryId] } });
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[180px] md:h-[400px] overflow-hidden lg:h-screen'>
        {slides.map((item, index) => (
          <img 
            key={index} 
            src={item} 
            alt={`Slide ${index + 1}`} 
            className={`absolute inset-0 w-full lg:h-full h-auto object-cover overflow-hidden transition-opacity duration-500 ${index === currSlide ? 'opacity-100' : 'opacity-0'}`} 
          />
        ))}             
        <button 
          className='bg-white absolute lg:top-1/2 md:top-1/2 top-[80px] left-4 border border-gray-600 rounded-xl transform -translate-y-1/2' 
          onClick={handlePrevSlide}
        >
          <ChevronLeftIcon className='w-6 h-6 text-black' />
        </button>
        <button 
          className='bg-white absolute lg:top-1/2 right-4 md:top-1/2 top-[80px] border border-black rounded-xl transform -translate-y-1/2' 
          onClick={handleNextSlide}
        >
          <ChevronRightIcon className='w-6 h-6 text-black' />
        </button>
      </div>
      <section className='py-12 bg-slate-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8 text-gray-900'>Shop by category</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {categories.map((item) => (
              <Card key={item.id} className="cursor-pointer flex justify-center items-center hover:shadow-md transition-shadow w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-2xl" onClick={() => handleCategoryClick(item.id)}> 
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <item.icon className='w-4 h-4 mb-4 text-gray-800 md:w-8 md:h-8 lg:w-12 lg:h-12' />
                  <span className='font-bold text-sm md:text-base lg:text-lg text-gray-800'>{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className='py-12 border '>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8 text-gray-900'>Feature Products</h2>
          <div className='flex flex-wrap justify-evenly gap-7'>
            {productList && productList.length > 0 
              ? productList.slice(0, 4).map(productItem => (
                  <ShopCard key={productItem.id} product={productItem} className="w-full sm:w-[48%] md:w-[30%] lg:w-[23%]" />
                ))
              : null
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
