/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 17:14:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { ChevronDown } from "lucide-react";

export default function MegaMenu({ menus, openMenu, setOpenMenu, scrolled }) {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {menus.map((menu, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu.title)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button
            className={`
              flex items-center space-x-1 text-sm font-medium transition
              ${scrolled ? "text-gray-800" : "text-white"}
            `}
          >
            <span>{menu.title}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {openMenu === menu.title && (
            <div className="absolute left-0 top-full z-30 mt-3 w-[500px] rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-sm animate-scaleIn">
              <div className="grid grid-cols-2 gap-3">
                {menu.items.map((item, j) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={j}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Icon className="h-4 w-4 text-[#009688]" />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="rounded-md bg-[#009688] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00796B] transition">
        Book a Demo
      </button>
    </div>
  );
}
