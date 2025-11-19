/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 13:59:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Footer — clickable, animated wave, improved layout
 */

import Container from "../layout/Container";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import doc1 from "../../assets/images/doc1.png";
import doc2 from "../../assets/images/doc2.png";
import doc3 from "../../assets/images/doc3.png";
import doc4 from "../../assets/images/doc4.png";
import doc5 from "../../assets/images/doc5.png";
import doc6 from "../../assets/images/doc6.png";
import doc7 from "../../assets/images/doc7.png";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#E8F7F4] border-t border-gray-300 mt-32 overflow-hidden">

      {/* 🟢 ANIMATED WAVE */}
      <div className="absolute -bottom-12 left-0 w-full pointer-events-none">
        <svg className="w-full wave-animation" height="100" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#D8F1EC"
            d="
              M0,256 C180,240 260,280 360,272 
              C480,260 520,200 640,192
              C760,184 840,240 960,240
              C1080,240 1180,190 1320,200
              L1440,210 L1440,320 L0,320 Z"
          ></path>
        </svg>
      </div>

      <Container className="py-16 relative z-10">

        {/* 🔵 TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>

            <p className="text-gray-700 leading-relaxed">
              Nigeria,<br />
              Lagos,<br />
              Yaba,<br />
              100001
            </p>

            {/* SOCIALS */}
            <div className="flex space-x-4 mt-5">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="group">
                  <Icon
                    className="
                      w-6 h-6 text-gray-700 
                      group-hover:text-green-600 
                      transition-all duration-200
                      group-hover:scale-110
                    "
                  />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-gray-700">
              {["About Us", "Careers", "Contact Us", "Partner With Us"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="
                      hover:text-green-700 
                      transition-colors 
                      cursor-pointer
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>

            <ul className="space-y-2 text-gray-700">
              <li><a href="tel:+919360952112" className="hover:text-green-700">+91 9360952112</a></li>
              <li><a href="mailto:sales@ndoc.com" className="hover:text-green-700">sales@ndoc.com</a></li>
              <li><a href="mailto:support@ndoc.com" className="hover:text-green-700">support@ndoc.com</a></li>
            </ul>
          </div>

        </div>

        {/* 🔵 CHARACTER IMAGES */}
        <div className="w-full mt-14">
          <div className="flex items-end justify-between gap-8 py-6">
            {[doc1, doc2, doc3, doc4, doc5, doc6, doc7].map((img, i) => (
              <img
                key={i}
                src={img}
                className="
                  h-[80px] rounded-xl object-contain 
                  transition-all duration-300 
                  hover:scale-110 hover:-translate-y-2 hover:shadow-xl
                "
                alt=""
              />
            ))}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-700 text-sm mt-8 pt-6 border-t border-gray-300">
          © {new Date().getFullYear()} N-doc. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}
