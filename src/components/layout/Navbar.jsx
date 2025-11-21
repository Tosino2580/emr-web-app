/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 12:34:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Navbar — glass on load, light-grey solid on scroll
 * Includes animated Get Started button (Framer Motion)
 */

import { useState, useEffect } from "react";
import DesktopMenu from "../ui/MegaMenu";
import MobileMenu from "../ui/Dropdown";
import LoginMenu from "../ui/LoginMenu";
import Container from "./Container";
import { menus } from "../data/menus";
import { Menu, X, ChevronDown } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close login dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".login-wrapper")) setLoginOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-300
        ${scrolled 
          ? "bg-gray-100 shadow-lg" 
          : "bg-gray-100/70 backdrop-blur-xl shadow-lg"
        }
      `}
    >
      <Container className="py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img 
            src={logo}
            alt="Logo"
            className="h-10 select-none"
          />
        </Link>

        {/* CENTER NAV */}
        <div className="hidden md:flex flex-1 justify-center">
          <DesktopMenu
            menus={menus}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-6">

          {/* 🔥 GET STARTED BUTTON (Framer Motion) */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="
              px-5 py-2.5 rounded-md
              bg-emerald-600 text-white
              font-semibold text-[15px]
              shadow-sm hover:bg-teal-700
              transition-colors cursor-pointer
            "
          >
            Get Started
          </motion.button>

          {/* LOGIN DROPDOWN */}
          <div className="relative login-wrapper">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLoginOpen(!loginOpen);
              }}
              className="
                flex items-center gap-x-1 
                text-[17px] font-bold 
                text-gray-900 cursor-pointer
              "
            >
              <span>Login</span>

              <ChevronDown
                className={`
                  w-5 h-5 transition-transform duration-200
                  ${loginOpen ? "rotate-180" : "rotate-0"}
                `}
                strokeWidth={2.6}
              />
            </button>

            <LoginMenu openLogin={loginOpen} setOpenLogin={setLoginOpen} />
          </div>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </Container>

      {/* MOBILE MENU */}
      <MobileMenu menus={menus} mobileOpen={mobileOpen} />
    </nav>
  );
}
