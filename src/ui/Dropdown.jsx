/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 15:50:13
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { ChevronDown } from "lucide-react";

export default function Dropdown({ menus, mobileOpen }) {
  if (!mobileOpen) return null;

  return (
    <div className="md:hidden px-6 pb-6 space-y-4 animate-scaleIn bg-white shadow-md">
      {menus.map((menu, i) => (
        <details key={i} className="border rounded-lg p-3">
          <summary className="flex justify-between items-center cursor-pointer">
            <span className="font-medium">{menu.title}</span>
            <ChevronDown className="h-4 w-4" />
          </summary>

          <div className="mt-3 space-y-2 pl-2">
            {menu.items.map((item, j) => {
              const Icon = item.icon;
              return (
                <div
                  key={j}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4 text-[#009688]" />
                  <span className="text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}
