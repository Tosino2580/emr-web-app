/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 02:24:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import DesktopMenu from "../ui/MegaMenu";
import MobileMenu from "../ui/Dropdown";
import LoginMenu from "../ui/LoginMenu";
import Container from "./Container";
import { menus } from "../data/menus";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav shadow + solid background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdown
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
        fixed top-0 left-0 w-full z-50 transition-all
        ${scrolled ? "bg-white shadow-lg" : "bg-transparent shadow-lg"}
      `}
    >
      <Container className="py-4 flex items-center justify-between">

        {/* LOGO */}
        <img src="/assets/images/logo.svg" alt="Logo" className="h-10" />

        {/* CENTER NAV ITEMS */}
        <div className="hidden md:flex flex-1 justify-center">
          <DesktopMenu
            menus={menus}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            scrolled={scrolled}
            textSize="text-[16px]"
            textWeight="font-bold"
            iconSize={20}
          />
        </div>

        {/* RIGHT — LOGIN (NO PAGE SHIFT) */}
        <div className="hidden md:flex items-center justify-end min-w-[160px]">
          <div className="relative login-wrapper">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLoginOpen(!loginOpen);
              }}
              className="flex items-center space-x-1 text-[16px] font-bold text-gray-900"
            >
              <span>Login</span>
              <ChevronDown className="w-[20px] h-[20px]" strokeWidth={2.6} />
            </button>

            <LoginMenu openLogin={loginOpen} />
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </Container>

      {/* MOBILE MENU */}
      <MobileMenu menus={menus} mobileOpen={mobileOpen} />
    </nav>
  );
}
