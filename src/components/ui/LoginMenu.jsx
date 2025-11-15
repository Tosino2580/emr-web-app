import { LogIn, User } from "lucide-react";

export default function LoginMenu({ openLogin, setOpenLogin }) {
  return (
    <div
      className={`
        absolute right-0 top-full mt-3 z-30 w-48 bg-white 
        rounded-xl shadow-lg ring-1 ring-black/5 backdrop-blur-sm
        ${openLogin ? "block" : "hidden"}
      `}
      onMouseEnter={() => setOpenLogin(true)}
      onMouseLeave={() => setOpenLogin(false)}
    >
      <div className="flex flex-col py-2">
        <a className="flex items-center px-4 py-2 space-x-3 hover:bg-gray-50 cursor-pointer">
          <LogIn className="h-4 w-4 text-[#009688]" />
          <span className="text-sm text-gray-700">User Login</span>
        </a>

        <a className="flex items-center px-4 py-2 space-x-3 hover:bg-gray-50 cursor-pointer">
          <User className="h-4 w-4 text-[#009688]" />
          <span className="text-sm text-gray-700">Patient Login</span>
        </a>
      </div>
    </div>
  );
}
