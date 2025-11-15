/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 17:36:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import DesktopMenu from "../ui/MegaMenu";
import MobileMenu from "../ui/Dropdown";
import { menus } from "../../data/menus";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 z-50 w-full transition-all
        ${scrolled ? "bg-white shadow-md" : "bg-transparent"}
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <img
          src="/assets/images/logo.svg"
          alt="Logo"
          className="h-8"
        />

        {/* Desktop */}
        <DesktopMenu
          menus={menus}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          scrolled={scrolled}
        />

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile */}
      <MobileMenu menus={menus} mobileOpen={mobileOpen} />
    </nav>
  );
}
