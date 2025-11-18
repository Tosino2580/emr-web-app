import React from 'react';
import { LmsSectionData } from '../data/LmsSectionData';

function LmsSection1() {
  return (
    <div className='mt-15 bg-[#b3f5eea4] py-15'>
      <h1 className=' md:flex justify-center text-2xl w-90 md:w-full text-start md:text-3xl  font-semibold'>Advanced <span className='text-amber-600 md:ml-2 mr-2'>Clinic</span>  & <span className='text-amber-600 md:ml-2 md:mr-2'>Hospital</span>  Laboratory Management Software</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 px-8 md:px-20 md:gap-12 md:mt-16'>
        {LmsSectionData.map((item, index) => (
          <div key={index} className=''>
             <div className='  flex flex-col items-center bg-white p-5  rounded-xl'>
              <img src={item.image} alt={item.title} className='w-25  px-6 py-6 rounded-full bg-[#a8dad5] relative bottom-16 '/>
              <h1 className='text-2xl font-bold text-[#009688]'>{item.title}</h1>
              <p className='text-center text-gray-600'>{item.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LmsSection1;
