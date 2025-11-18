/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 13:41:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Footer — animations, parallax wave, real icons, polished spacing
 */

import Container from "../layout/Container";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// IMPORT CHARACTER IMAGES
import doc1 from "../../assets/images/doc1.png";
import doc2 from "../../assets/images/doc2.png";
import doc3 from "../../assets/images/doc3.png";
import doc4 from "../../assets/images/doc4.png";
import doc5 from "../../assets/images/doc5.png";
import doc6 from "../../assets/images/doc6.png";
import doc7 from "../../assets/images/doc7.png";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#E8F7F4] border-t border-gray-300 mt-32">

      {/* PARALLAX WAVE (BOTTOM) */}
      <div
        className="absolute -bottom-10 left-0 w-full overflow-hidden"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="w-full"
          height="80"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#D8F1EC"
            d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,192C672,192,768,192,864,202.7C960,213,1056,235,1152,224C1248,213,1344,171,1392,149.3L1440,128V320H0Z"
          ></path>
        </svg>
      </div>

      <Container className="py-12 relative z-10">

        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Nigeria,<br />
              Lagos,<br />
              Yaba,<br />
              100001
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex space-x-4 mt-5">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <Icon
                  key={i}
                  className="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer transition-all duration-200"
                />
              ))}
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-gray-700">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Partner With Us</li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-700">
              <li>+91 9360952112</li>
              <li>sales@ndoc.com</li>
              <li>support@ndoc.com</li>
            </ul>
          </div>
        </div>

        {/* CHARACTER IMAGES ROW */}
        <div className="w-full mt-14 overflow-hidden">
          <div className="flex items-end justify-between gap-8 py-6">

            {[doc1, doc2, doc3, doc4, doc5, doc6, doc7].map((img, i) => (
              <img
                key={i}
                src={img}
                className="
                  h-[90px] rounded-xl object-contain 
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
