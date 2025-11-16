/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 14:47:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/

import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </>
  );
}
