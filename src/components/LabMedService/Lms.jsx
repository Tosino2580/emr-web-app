/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 18:04:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import ButtonGetStarted from '../ui/ButtonGetStarted';
import ButtonContactUs from '../ui/ButtonContactUs';
import LabImage from "../../assets/images/lab-management-system.webp";
import LmsSection1 from './LmsSection1';
function Lms() {
  return (
    <div>
      <div className='bg-red-50 flex items-center gap-1 h-14'>
        <h1 className='text-xl text-[#009688]'>Home</h1>
        <FaChevronRight className='text-[#009688] mt-1' />
        <h1 className='ml-5 text-xl'>LMS</h1>
      </div>
      <div className='flex flex-col md:flex-row  items-center px-4 md:px-20'>
        <div className=''>
          <h1 className='text-xl md:text-5xl/14 font-semibold '>Best LIMS Software <br /> for <span className='text-[#009688]'>Hospitals</span>  & <span className='text-[#009688]'> Clinical Labs</span> <br /> Management</h1>
          <p className='mt-3 md:w-140 md:text-xl text-gray-600'>Your Go-To Solution for Boosting Operational Efficiency and Easing Lab Workflows, Backed by Extensive User Trust.</p>
          <div className='flex flex-col md:flex-row items-center gap-4 mt-15'>
            <ButtonGetStarted />
            <ButtonContactUs />
          </div>
        </div>
        <div>
          <img src={LabImage} alt="Lab Management System" className='w-200 mt-10'/>
        </div>
      </div>
      <LmsSection1/>
    </div>
  );
}

export default Lms;
