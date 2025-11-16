/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 13:37:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Hero Section — updated max-width now uses Container (max-w-6xl)
 */

import ECG from "../../components/ui/ECG";
import doctorImg from "../../assets/images/Doc.png";
import Container from "../layout/Container";

export default function Hero() {
  return (
    <section className="w-full bg-white pt-28 pb-20">
      <Container className="min-h-[85vh] flex items-center">

        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0F172A]">
            Modern <span className="text-[#009688]">Digital Healthcare</span>
            <br />

            <span className="flex items-center gap-3 flex-wrap">
              Solutions for Clinics & Hospitals
              <ECG />
            </span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-md">
            Empowering healthcare teams with intelligent, modern, and efficient
            software solutions.
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

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex w-1/2 justify-center">
          <div className="relative h-[520px] max-w-[520px] w-full rounded-3xl overflow-hidden shadow-md">
            <img
              src={doctorImg}
              alt="Doctor"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>
        </div>

      </Container>
    </section>
  );
}
