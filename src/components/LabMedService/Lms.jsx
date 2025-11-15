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
function Lms() {
  return (
    <div>
      <div className='bg-red-100 flex items-center gap-1 h-14'>
        <h1 className='text-xl text-amber-700'>Home</h1>
        <FaChevronRight className='text-amber-700 mt-1' />
        <h1 className='ml-5 text-xl'>LMS</h1>
      </div>
      <div className='flex'>
        <div className=''>
          <h1 className='text-4xl font-bold w-150 '>Best LIMS Software <br /> for Hospitals & Clinical Labs <br /> Management</h1>
          <p>Your Go-To Solution for Boosting Operational Efficiency and Easing Lab Workflows, Backed by Extensive User Trust.</p>
          <div className='flex gap-4'>
            <ButtonGetStarted />
            <ButtonContactUs />
          </div>
        </div>
        <div>
          <img src={LabImage} alt="Lab Management System" className='w-130'/>
        </div>
      </div>
    </div>
  );
}

export default Lms;
