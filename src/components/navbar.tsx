"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/Logo.svg";
import { FaGithub } from "react-icons/fa";

const navItems = ["Home", "Docs"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-500 sm:inset-x-6 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-lg rounded-xl"
          : "bg-transparent"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="relative z-10 px-6 sm:px-12 md:px-6 py-4">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center font-obitron">
              {isScrolled ? (
                <Image src={logo} alt="noventis-logo" />
              ) : (
                <Image src={logo} alt="noventis-logo" />
              )}
              <span
                className={`text-2xl font-bold font-orbitron transition-colors ${
                  isScrolled
                    ? "text-[#FF6849] text-noventis-color"
                    : "text-white text-shadow-custom"
                }`}
              >
                Noventis
              </span>
            </div>
            <div className="hidden lg:flex items-center justify-between gap-x-18 mr-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className={`nav-hover-btn ${
                    isScrolled
                      ? "nav-hover-btn-scrolled"
                      : "nav-hover-btn-light"
                  }`}
                >
                  {item}
                </a>
              ))}

              <FaGithub
                size={32}
                className="text-[#FF6849] transition-all duration-300 hover:text-[#0f2cab] -ml-2"
              />
            </div>

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded ${
                  isScrolled ? "text-[#FF6849]" : "text-white"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden text-center absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
              isScrolled
                ? "bg-transparent backdrop-blur-md shadow-md"
                : "bg-transparent backdrop-blur-md"
            }`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4 mx-auto">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className={`nav-hover-btn ${
                    isScrolled
                      ? "nav-hover-btn-scrolled"
                      : "nav-hover-btn-light"
                  }`}
                >
                  {item}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-4"></div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
