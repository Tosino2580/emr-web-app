/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 17:14:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center bg-white">

      {/* Left Image */}
      <div className="w-1/2 h-full relative hidden md:block">
        <img
          src="/assets/images/doctor.png"
          alt="Doctor"
          className="h-full w-full object-cover"
        />
<<<<<<< HEAD:src/sections/Hero.jsx

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
=======
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
>>>>>>> 24ce33324b66525fe473d3ebce95ecb5e8f194a6:src/components/sections/Hero.jsx
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
