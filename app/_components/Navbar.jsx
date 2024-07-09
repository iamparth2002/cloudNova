import Link from 'next/link';
import React from 'react'
import { BsArrowUpRightCircleFill } from "react-icons/bs";


const Navbar = () => {
  return (
    <div className='flex px-8 md:px-20 justify-between items-center py-4'>
        <h1 className='text-2xl font-semibold'>Cloud<span className='text-primary'>Nova.</span></h1>
        <div className='flex gap-10 font-medium items-center '>
            <Link href="/sign-up">
            <button className='hidden md:flex'>Sign up</button>
            </Link>
            <Link href="/sign-in">
            <button className='flex gap-4 items-center bg-[#726DED] p-4  md:p-4 rounded-xl text-[#fff] '>Get Started <BsArrowUpRightCircleFill color='white' size={20} /></button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar