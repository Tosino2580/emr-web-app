/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 02:05:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { LogIn, User } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginMenu({ openLogin }) {
  return (
    <AnimatePresence>
      {openLogin && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 top-full mt-3 z-50 w-52 bg-white rounded-xl shadow-xl ring-1 ring-black/5 backdrop-blur-sm py-2"
        >
          <div className="flex flex-col">
          <Link to={"/user-login"}>
            <div className="flex items-center px-4 py-2 space-x-3 cursor-pointer hover:bg-gray-50 hover:text-[#009688] transition-all">
              <LogIn className="h-5 w-5" strokeWidth={2.6} />
              <span className="text-sm font-semibold">User Login</span>
            </div>
            </Link>
            <Link to={"/patient-login"}>
            <div className="flex items-center px-4 py-2 space-x-3 cursor-pointer hover:bg-gray-50 hover:text-[#009688] transition-all">
              <User className="h-5 w-5" strokeWidth={2.6} />
              <span className="text-sm font-semibold">Patient Login</span>
            </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
