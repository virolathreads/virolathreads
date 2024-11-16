import React from "react";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#254f43] pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Section */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <a href="/">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457917/ppxryvdv0xd6zjwoqah0.jpg"
                  alt="Logo"
                  className="w-40 h-auto object-contain"
                />
              </a>
            </div>
           
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/shop"
                  className="text-white hover:text-[#254f43] transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white hover:text-[#254f43] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white hover:text-[#254f43] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className="text-3xl font-semibold text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+2347066657908"
                  className="text-white hover:text-[#254f43] transition-colors "
                >
                  07066657908
                </a>
              </li>
              <li>
                <a
                  href="mailto:virolathreads@gmail.com"
                  className="text-white hover:text-[#254f43] transition-colors break-all"
                >
                  virolathreads@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/dir/6.4271817,3.470544/12a+A.J.+Marinho+Dr,+Victoria+Island,+Lagos+106104,+Lagos/@6.4305787,3.4096684,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103bf53b1e6008a9:0xf895fd49e3280d90!2m2!1d3.4323231!2d6.4266543?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D"
                  className="text-white hover:text-[#254f43] transition-colors"
                >
                  12a A.J Marinho Drive Victoria Island Lagos
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="text-center">
            <p className="text-white text-lg">
              Copyright &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
