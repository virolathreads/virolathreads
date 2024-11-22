import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Instagram } from "@mui/icons-material";

export default function LoginHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="header-area">
        <div className="sticky top-0 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-28">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/">
                  <img
                    src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457982/ef3tnweirfwsvvd1djwc.png"
                    alt="Logo"
                    className="h-96 w-full"
                  />
                </a>
              </div>

              {/* Right Section - Navigation, Social, and Cart */}
              <div className="flex-1 flex items-center justify-end">
                {/* Desktop Navigation */}
                <nav className="hidden lg:block mr-8">
                  <ul className="flex space-x-8">
                    <li>
                      <a
                        href="/dasboard"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/productlist"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Products
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/about"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        About
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="/bloglist"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Blog
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/contact"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        Contact
                      </a>
                    </li> */}
                  </ul>
                </nav>

                {/* Social Icons and Cart */}
                <div className="flex items-center space-x-6">
                  <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <Instagram className="h-10 w-10" />
                    </a>
                  </div>

                  <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                      <ShoppingCart className="h-10 w-10 text-gray-400 hover:text-gray-500" />
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#254f43] text-white rounded-full flex items-center justify-center text-xs">
                        0
                      </span>
                    </div>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden">
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a
                    href="/"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Home
                  </a>
                  <a
                    href="/shoplist"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Product List
                  </a>
                  {/* <a
                    href="/about"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    About
                  </a> */}
                  <a
                    href="/bloglist"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Blog List
                  </a>
                  {/* <a
                    href="/contact"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    Contact
                  </a> */}
                </div>

                {/* Mobile Social and Cart */}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center justify-center space-x-4 px-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                        0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
