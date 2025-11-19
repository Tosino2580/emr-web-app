/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 13:49:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * MegaMenu — fixed color version
 * Always visible, no white text, no scroll dependency
 */

import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="hidden md:flex items-center gap-10">
      {menus.map((menu, i) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu.title)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {/* TOP BUTTON */}
          <button
            className={`
              flex items-center gap-1
              ${textSize} ${textWeight}
              text-gray-800 hover:text-emerald-700
              transition-colors
            `}
          >
            {menu.title}

            <ChevronDown
              size={18}
              className={`
                transition-transform duration-200 text-gray-800
                ${openMenu === menu.title ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* DROPDOWN */}
          <AnimatePresence>
            {openMenu === menu.title && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="
                  absolute left-0 top-full mt-3 z-40
                  w-[320px] bg-white rounded-xl shadow-xl
                  ring-1 ring-black/5 p-3
                "
              >
                {menu.items.map((item, j) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.06 }}
                    >
                      <Link
                        to={item.path || "#"}
                        className="
                          flex items-center gap-3 p-3
                          rounded-md cursor-pointer
                          hover:bg-emerald-50 hover:text-emerald-700
                          transition-all
                        "
                      >
                        {Icon && (
                          <Icon
                            className="text-emerald-600"
                            size={iconSize}
                            strokeWidth={2.3}
                          />
                        )}

                        <span className="text-[15px] font-semibold text-gray-800">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
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
