import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className="hidden lg:flex items:center justify-center bg-black w-1/2 px-12">
        <div className='max-w-md text-center flex text-primary-foreground justify-center items-center'>
            <h1 className='tracking-tight text-8xl font-extrabold justify-center'>
                E C O M
            </h1>
        </div>
        </div>
        <div className='flex flex-1 items-center
        justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>

        </div>

    </div>
  )
}

export default Auth