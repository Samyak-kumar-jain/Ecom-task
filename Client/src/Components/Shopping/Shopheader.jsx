import { HousePlug, LogOut, Menu, ShoppingCartIcon, UserCog, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu.jsx';
import { Avatar, AvatarFallback } from '../ui/avatar.jsx';
import { logoutnUser } from '../../features/Authslice/authslice.js';
import { Sheet } from '../ui/sheet.jsx';
import CartWrapper from './CartWrapper.jsx';
import { BallTriangle } from 'react-loader-spinner';
import { fetchCartItems } from '../../features/CartSlice/Cartslice.js';

const Shopheader = () => {
  const { isAuthenticated, user, isLoading: authLoading } = useSelector((state) => state.authen);
  const [loading, setLoading] = useState(true); // Local loading state for 5-second delay
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  // console.log(cartItems);

  // Simulate a 5-second delay on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set local loading to false after 5 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const menuItems = [
    { to: "/shop/home", label: "Home", id: "home" },
    { to: "/shop/listing", label: "Products", id: "Products" },
    
  ];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClick = (id) => {
    setActiveItem(id);
  };

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  const handleLogout = () => {
    setLoading(true); // Start loading on logout

    setTimeout(() => {
      dispatch(logoutnUser());
      setLoading(false); // Stop loading after logout completes
      navigate('/auth/login'); // Navigate to login page after logout
    }, 2000); // 2-second delay for the logout process
  };

  const HeaderRightContent = () => {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openSheet} onOpenChange={() => setOpenSheet(false)} opacity={0.2} cla>
          <button onClick={() => setOpenSheet(true)} className="hover:bg-black hover:p-1 hover:text-white transition-all duration-300 rounded-lg">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="sr-only">User cart</span>
          </button>
          <CartWrapper cartItems={cartItems?.items || []} />

        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?user.email[0] : <h4>U</h4>}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-52 mt-2">
            <DropdownMenuLabel className="font-medium">
              Logged in as {user?.username || "User"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 w-5 h-5" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // Render the loading state if either the local loading or authLoading is true
  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="black"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div className='sticky top-0 z-50 w-full bg-background border-b'>
        <div className='flex h-16 items-center justify-between px-4 md:px-5'>
          <Link to="/shop/home" className='flex items-center gap-2 justify-center'>
            <HousePlug className='h-6 w-6' />
            <span className='font-bold'>Ecom</span>
          </Link>

          <div className='hidden lg:flex flex-1 justify-center gap-6'>
            {menuItems.map((item) => (
              <Link
                className={`text-sm font-medium transition-all duration-300 ${
                  activeItem === item.id
                    ? 'font-bold text-xl bg-black text-white px-4 py-2 rounded-3xl '
                    : ''
                } hover:font-bold hover:text-xl hover:bg-black hover:text-white hover:px-4 hover:py-2 hover:rounded-3xl items-center justify-center flex`}
                key={item.id}
                to={item.to}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className='hidden lg:block'>
            <HeaderRightContent />
          </div>

          <button className='lg:hidden flex' onClick={toggleMenu}>
            <Menu className='h-6 w-6' />
          </button>
        </div>

        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
          <div className='flex justify-between items-center p-4 border-b'>
            <span className='font-bold'>Menu</span>
            <button className='bg-black text-white order rounded-md p-1' onClick={toggleMenu}>
              <X className='h-5 w-5' />
            </button>
          </div>
          <div className='flex flex-col p-4 gap-4'>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                className='text-sm font-medium'
                to={item.to}
                onClick={toggleMenu} // Close menu on item click
              >
                {item.label}
              </Link>
            ))}
            <HeaderRightContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shopheader;
