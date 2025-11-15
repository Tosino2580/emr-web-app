/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 19:34:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { LogIn, User } from "lucide-react";

export default function LoginMenu({ openLogin, setOpenLogin }) {
  return (
    <div
      className={`
        absolute right-0 top-full z-40 mt-2 w-48 bg-white
        rounded-xl shadow-lg ring-1 ring-black/5 backdrop-blur-sm
        ${openLogin ? "block" : "hidden"}
      `}
      onMouseEnter={() => setOpenLogin(true)}
      onMouseLeave={() => setOpenLogin(false)}
    >
      <div className="flex flex-col py-2">
        <a className="flex items-center px-4 py-2 space-x-3 hover:bg-gray-50 cursor-pointer">
          <LogIn className="h-5 w-5 text-[#009688]" strokeWidth={2.3} />
          <span className="text-sm font-medium text-gray-800">User Login</span>
        </a>

        <a className="flex items-center px-4 py-2 space-x-3 hover:bg-gray-50 cursor-pointer">
          <User className="h-5 w-5 text-[#009688]" strokeWidth={2.3} />
          <span className="text-sm font-medium text-gray-800">Patient Login</span>
        </a>
      </div>
    </div>
  );
}
