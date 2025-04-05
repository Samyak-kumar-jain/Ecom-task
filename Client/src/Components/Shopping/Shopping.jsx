import React from 'react'
import { Outlet } from 'react-router-dom'
import Shopheader from './Shopheader.jsx'

const Shopping = () => {
  return (
    <div className='flex flex-col bg-white '>
      
      <Shopheader/>

      <div className='flex flex-col w-full '>
        <Outlet/> 
      </div>
    </div>
  )
}

export default Shopping