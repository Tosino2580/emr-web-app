/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 02:05:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function MegaMenu({
  menus,
  openMenu,
  setOpenMenu,
  textSize = "text-[16px]",
  textWeight = "font-bold",
  iconSize = 20,
}) {
  return (
    <div className="hidden md:flex items-center space-x-10">
      {menus.map((menu, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu.title)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {/* TOP-LEVEL BUTTON */}
          <button
            className={`
              flex items-center space-x-1 transition-all
              ${textSize} ${textWeight} text-gray-900
            `}
            aria-haspopup="true"
            aria-expanded={openMenu === menu.title}
          >
            <span>{menu.title}</span>
            <ChevronDown
              className="transition-all"
              style={{ width: iconSize, height: iconSize }}
              strokeWidth={2.6}
            />
          </button>

          {/* Animated Dropdown (AnimatePresence + motion) */}
          <AnimatePresence>
            {openMenu === menu.title && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="absolute left-0 top-full mt-3 w-72 p-3 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 z-40 pointer-events-auto"
              >
                {menu.items.map((item, j) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      to={item.path || "#"}
                      key={j}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-all hover:text-[#009688] hover:bg-gray-50"
                    >
                      {Icon ? (
                        <Icon
                          style={{ width: iconSize - 4, height: iconSize - 4 }}
                          strokeWidth={2.4}
                        />
                      ) : null}
                      <span className="text-[15px] font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
