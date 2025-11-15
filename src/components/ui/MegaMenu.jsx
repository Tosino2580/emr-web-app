/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 19:35:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MegaMenu({ menus, openMenu, setOpenMenu }) {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {menus.map((menu, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu.title)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {/* Menu Button */}
          <button className="flex items-center space-x-1 text-sm font-semibold text-gray-800">
            <span>{menu.title}</span>
            <ChevronDown className="h-5 w-5" strokeWidth={2.3} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {openMenu === menu.title && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.15 }}
                className="
                  absolute left-0 top-full z-30 w-[500px]
                  rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5
                  backdrop-blur-sm
                "
              >
                <div className="grid grid-cols-2 gap-3">
                  {menu.items.map((item, j) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={j}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <Icon className="h-5 w-5 text-[#009688]" strokeWidth={2.3} />
                        <span className="text-sm font-medium text-gray-800">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
