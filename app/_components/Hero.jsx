'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa6';
import { FaImage } from 'react-icons/fa6';
import { LuUpload } from "react-icons/lu";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="px-8 md:px-20 pt-2 md:py-10 flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex flex-col gap-8 items-startbg-primary justify-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Share files without worrying about security and capacity.
        </h1>
        <p className=" text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iusto
          eius quas aspernatur rerum delectus nemo aliquid sapiente excepturi
          magnam!
        </p>
        <div className="flex gap-10 font-medium ">
          <button className="flex gap-4 items-center bg-[#726DED] p-4 rounded-xl text-[#fff] "
          onClick={() => router.push('/upload')}>
            Get Started <BsArrowUpRightCircleFill color="white" />
          </button>
          <button onClick={()=>router.push('/sign-up')}>Sign up</button>
        </div>
      </div>

      <div className="flex-1">
        <img src="/hero.jpg" alt="" className="rounded-2xl" />
        <div className="bg-white border-[16px] rounded-3xl flex flex-col gap-1 md:gap-4 p-4 md:w-1/2 w-[300px] shadow-2xl relative -mt-10 -ml-3 md:-mt-52 md:-ml-6">
          <h1 className='md:text-lg font-semibold flex gap-4 items-center mb-4'> <LuUpload size={25} color='red' /> Upload Files</h1>
          <div>
            <div className="flex items-center gap-6">
              <FaFolder size={20} color="#FACC15" />
              <h1 className='font-medium'>My Report <span className='text-gray-500 text-sm'>docx</span></h1>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2.5 mb-4 mt-4">
              <div class="bg-yellow-400 h-2.5 rounded-full w-[45%]"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-6">
              <FaImage size={20} color="#726DED" />
              <h1 className='font-medium'>Avatar <span className='text-gray-500 text-sm'>png</span></h1>
            </div>
           
            <div class="w-full bg-gray-100 rounded-full h-2.5 mb-4 mt-4">
              <div
                class="bg-[#726DED] h-2.5 rounded-full w-[80%]"
                
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
