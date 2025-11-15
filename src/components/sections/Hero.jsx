/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 19:04:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import doctorImg from "../../assets/images/Doc.png";

export default function Hero() {
  return (
    <section className="w-full min-h-[80vh] flex items-center bg-white py-16">

      {/* Left Image */}
      <div className="w-1/2 flex justify-center items-center hidden md:flex">
        <div className="relative h-[420px] w-full max-w-[450px] rounded-3xl overflow-hidden shadow-md">
          <img
            src={doctorImg}
            alt="Doctor"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
        </div>
      </div>

      {/* Right Text */}
      <div className="w-full md:w-1/2 px-8 md:px-16">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0F172A]">
          Modern <span className="text-[#009688]">Digital Healthcare</span>
          <br /> Solutions for Clinics & Hospitals
        </h1>

        <p className="mt-4 text-gray-600 max-w-md">
          Empowering healthcare teams with intelligent, modern, and efficient software solutions.
        </p>

        <div className="mt-8 flex space-x-4">
          <button className="bg-[#009688] text-white px-6 py-3 rounded-md hover:bg-[#00796B] transition">
            Book a Demo
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-md">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
