import React from 'react'

/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 18:12:29
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
export default function Footer() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <img src="/assets/images/logo.svg" alt="Logo" className="h-8" />
          <span>© {new Date().getFullYear()} YourCompany</span>
        </div>

        <div className="flex items-center space-x-6">
          <a href="/about" className="hover:text-[#009688]">About</a>
          <a href="/contact" className="hover:text-[#009688]">Contact</a>
          <a href="/privacy" className="hover:text-[#009688]">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
