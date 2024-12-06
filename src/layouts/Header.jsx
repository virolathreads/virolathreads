import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User2Icon } from "lucide-react";
import Cart from "@/pages/Cart";
import { useCart } from "@/CartContext";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useUser();
  const { cart, handleCurrencyChange, currency } = useCart(); // Access the cart from context
  const [count, setCount] = useState(0); // State to hold the total cart count
  useEffect(() => {
    if (Array.isArray(cart && cart.lineItems)) {
      // Calculate the total quantity of all items in the cart
      const totalQuantity =
        cart &&
        cart.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

      setCount(totalQuantity); // Update the count state
    } else {
      setCount(0); // If cart is not an array, set count to 0
    }
  }, [cart]);

  return (
    <header className="bg-white shadow-sm">
      <div className="header-area">
        <div className="sticky top-0 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-left items-center h-32">
              {/* Logo */}
              <div className="d-flex">
                <a href="/">
                  <img
                    src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457982/ef3tnweirfwsvvd1djwc.png"
                    alt="Logo"
                    className="h-auto w-96" // Adjust height for mobile
                  />
                </a>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <select
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  value={currency}
                  class="p-2 border rounded-md focus:ring focus:ring-blue-300"
                >
                  <option value="NGN">Naira (NGN)</option>
                  <option value="GBP">Pound (GBP)</option>
                </select>
              </div>
              {/* Right Section - Navigation, Social, and Cart */}
              <div className="flex-1 flex items-center justify-end">
                {/* Desktop Navigation */}

                <nav className="hidden lg:block mr-8">
                  <ul className="flex space-x-8">
                    <li>
                      <a
                        href="/"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        HOME
                      </a>
                    </li>
                    <li>
                      <a
                        href="/shop"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        SHOP
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        ABOUT
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        BLOG
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        CONTACT
                      </a>
                    </li>
                  </ul>
                </nav>

                {/* Social Icons and Cart */}
                <div className="flex items-center space-x-6">
                  <div className="hidden md:flex space-x-4">
                    <a
                      href="/login"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <User2Icon className="h-10 w-10" />
                    </a>
                    {user && <div>{user.name}</div>}
                  </div>

                  <div className="hidden md:flex items-center space-x-4">
                    {/* Cart Icon with Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          window.href = "/cart";
                        }}
                        className="focus:outline-none"
                      >
                        <ShoppingCart
                          onClick={() => {
                            window.href = "/cart";
                          }}
                          className="h-10 w-10 text-gray-400 hover:text-gray-500"
                        />
                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#fff] text-[#254f43] rounded-full flex items-center justify-center text-xs">
                          {count || "0"}
                        </span>
                      </button>
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
                    HOME
                  </a>
                  <a
                    href="/shop"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    SHOP
                  </a>
                  <a
                    href="/about"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    ABOUT
                  </a>
                  <a
                    href="/blog"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    BLOG
                  </a>
                  <a
                    href="/contact"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    CONTACT
                  </a>
                </div>

                {/* Mobile Social and Cart */}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center justify-center space-x-4 px-4">
                    <a
                      href="/login"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <User2Icon className="h-5 w-5" />
                    </a>
                    {user && <div>{user.name}</div>}
                    <div
                      className="relative"
                      onClick={() => {
                        window.href = "/cart";
                      }}
                    >
                      <ShoppingCart
                        onClick={() => {
                          window.href = "/cart";
                        }}
                        className="h-6 w-6 text-gray-400 hover:text-gray-500"
                      />
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-white text-[#254f43] rounded-full flex items-center justify-center text-sm">
                        {count || "0"}
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
