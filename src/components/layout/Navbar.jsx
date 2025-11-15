/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 19:35:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState } from "react";
import DesktopMenu from "../ui/MegaMenu";
import MobileMenu from "../ui/Dropdown";
import LoginMenu from "../ui/LoginMenu";
import { menus } from "../data/menus";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <img src="/assets/images/logo.svg" alt="Logo" className="h-8" />

        {/* Desktop Menu */}
        <DesktopMenu menus={menus} openMenu={openMenu} setOpenMenu={setOpenMenu} />

        {/* Login */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setOpenLogin(true)}
          onMouseLeave={() => setOpenLogin(false)}
        >
          <button className="flex items-center space-x-1 text-sm font-semibold text-gray-800">
            <span>Login</span>
            <ChevronDown className="h-5 w-5" strokeWidth={2.3} />
          </button>

          <LoginMenu openLogin={openLogin} setOpenLogin={setOpenLogin} />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu menus={menus} mobileOpen={mobileOpen} />
    </nav>
  );
}
