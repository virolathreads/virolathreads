import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User2Icon } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/CartContext";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useUser();
  const { cart, handleCurrencyChange, currency } = useCart(); // Access the cart from context
  const [count, setCount] = useState(0); // State to hold the total cart count
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (value) => {
    handleCurrencyChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (Array.isArray(cart && cart.lineItems)) {
      const totalQuantity =
        cart &&
        cart.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setCount(totalQuantity);
    } else {
      setCount(0);
    }
  }, [cart]);

  // Animation Variants
  const menuItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const staggeredMenu = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="header-area">
        <div className="sticky top-0 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-left items-center h-32">
              <div className="d-flex">
                <a href="/">
                  <img
                    src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457982/ef3tnweirfwsvvd1djwc.png"
                    alt="Logo"
                    className="h-auto w-96"
                  />
                </a>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-3 font-light underline shadow-none text-2xl text-gray-800 hover:text-gray-600 flex items-center justify-between w-auto">
                      {currency === "₦"
                        ? "NIGERIA    (NGN) ₦"
                        : "UNITED KINGDOM   (GBP) £"}
                      <svg
                        className="w-6 h-6 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-10 w-56 mt-2 shadow-md bg-white rounded-md">
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={staggeredMenu}
                    >
                      <DropdownMenuItem
                        onClick={() => handleSelection("₦")}
                        className="p-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        <motion.div variants={menuItemVariants}>
                          Nigeria | (NGN) ₦
                        </motion.div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSelection("£")}
                        className="p-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        <motion.div variants={menuItemVariants}>
                          United Kingdom | (GBP) £
                        </motion.div>
                      </DropdownMenuItem>
                    </motion.ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex-1 flex items-center justify-end">
                <nav className="hidden lg:block mr-8">
                  <motion.ul
                    className="flex space-x-8"
                    initial="hidden"
                    animate="visible"
                    variants={staggeredMenu}
                  >
                    {[
                      { name: "HOME", href: "/" },
                      { name: "SHOP", href: "/shop" },
                      { name: "ABOUT", href: "/about" },
                      { name: "BLOG", href: "/blog" },
                      { name: "CONTACT", href: "/contact" },
                    ].map((item, index) => (
                      <motion.li key={index} variants={menuItemVariants}>
                        <a
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600 text-wrap font-normal"
                        >
                          {item.name}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>

                <div className="flex items-center space-x-6">
                  <a
                    href="/login"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <User2Icon className="h-10 w-10 color-[#65867c]" />
                  </a>
                  <div className="hidden md:flex space-x-4">
                    <a
                      href="/profile"
                      className="text-gray-400 hover:text-blue-500  text-nowrap"
                    >
                      {user && <div>{user?.name?.toUpperCase()}</div>}
                    </a>
                  </div>

                  <div className="hidden md:flex items-center space-x-4">
                    {/* Cart Icon with Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          window.location.href = "/cart";
                        }}
                        className="focus:outline-none"
                      >
                        <ShoppingCart
                          onClick={() => {
                            window.location.href = "/cart";
                          }}
                          className="h-10 w-10 text-gray-400 hover:text-gray-500"
                        />
                        <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#65867c] text-[#fff] rounded-full flex items-center justify-center text-xs">
                          {count || "0"}
                        </span>{" "}
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
                    className="block px-3 py-2 text-xl font-normal text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    HOME
                  </a>
                  <a
                    href="/shop"
                    className="block px-3 py-2 text-xl font-normal text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    SHOP
                  </a>
                  <a
                    href="/about"
                    className="block px-3 py-2 text-xl font-normal text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    ABOUT
                  </a>
                  <a
                    href="/blog"
                    className="block px-3 py-2 text-xl font-normal text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    BLOG
                  </a>
                  <a
                    href="/contact"
                    className="block px-3 py-2 text-xl font-normal text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    CONTACT
                  </a>
                </div>

                {/* Mobile Social and Cart */}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center justify-center space-x-4 px-4 text-wrap text-xl font-semibold">
                    <a
                      href="/login"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <User2Icon className="h-5 w-5" />
                    </a>
                    {user && <div>{user?.name?.toUpperCase()}</div>}
                    <div
                      className="relative"
                      onClick={() => {
                        window.location.href = "/cart";
                      }}
                    >
                      <ShoppingCart
                        onClick={() => {
                          window.location.href = "/cart";
                        }}
                        className="h-6 w-6 text-gray-400 hover:text-gray-500"
                      />
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#65867c] text-[#fff] rounded-full flex items-center justify-center text-sm">
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
