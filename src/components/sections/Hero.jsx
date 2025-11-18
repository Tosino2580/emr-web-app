/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 17/11/2025 - 08:09:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Hero Section — with Framer Motion animated buttons
 */

import { motion } from "framer-motion";
import ECG from "../../components/ui/ECG";
import doctorImg from "../../assets/images/Doc.png";
import Container from "../layout/Container";

export default function Hero() {
  const scrollToElement = (selectorOrId) => {
    const el =
      document.getElementById(selectorOrId) ||
      document.querySelector(selectorOrId);

    if (!el) return;

    const nav = document.querySelector("nav");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;

    const top =
      el.getBoundingClientRect().top + window.scrollY - navHeight - 12;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const onGetStarted = () => scrollToElement("services");
  const onContact = () => scrollToElement("contact");

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

          {/* BUTTONS (Framer Motion) */}
          <div className="mt-8 flex space-x-4">

            {/* GET STARTED */}
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="cursor-pointer bg-[#009688] text-white px-6 py-3 rounded-md shadow-md"
            >
              Get Started
            </motion.button>

            {/* CONTACT */}
            <motion.button
              onClick={onContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="cursor-pointer border border-gray-300 px-6 py-3 rounded-md shadow-sm bg-white"
            >
              Contact Us
            </motion.button>

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
