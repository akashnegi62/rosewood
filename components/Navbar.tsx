"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Focus the input automatically when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <header className="fixed top-5 left-0 right-0 z-99 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
      {/* 1. Brand Logo - Styled from Image 1 / Image 2 blend */}
      <Link href="/" className="flex items-center gap-2 group z-50">
        <div className="text-white font-[Vera] text-2xl tracking-wide flex flex-col leading-none">
          <span className="font-semibold">ROSEWOOD</span>
          <span className="text-[12px] tracking-[0.2em] font-medium text-white uppercase">
            WORLDWIDE TRAVELS
          </span>
        </div>
      </Link>

      {/* 2. Floating Capsule Navbar Container */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white/90 backdrop-blur-md rounded-full px-3 py-2 flex items-center shadow-lg border border-white/20 max-w-3xl w-full justify-between mx-4 h-14"
      >
        <AnimatePresence mode="wait">
          {!isSearchOpen ? (
            // NORMAL TABS STATE (Links from Image 1)
            <motion.nav
              key="nav-links"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full text-sm font-medium text-gray-700 px-3"
            >
              <Link
                href="/resorts"
                className="hover:text-black transition-colors px-3 py-1"
              >
                Resorts
              </Link>

              {/* Dropdown Example */}
              <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors px-3 py-1">
                <span>Experiences</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </div>

              <Link
                href="/clubelevate"
                className="hover:text-black transition-colors px-3 py-1 font-semibold flex items-center gap-1"
              >
                <span className="bg-black text-white px-2.5 py-1.5 rounded-full text-sm tracking-wider">
                  C
                </span>
                Club Elevate
              </Link>

              <Link
                href="/blogs"
                className="hover:text-black transition-colors px-3 py-1"
              >
                Blog
              </Link>
              <Link
                href="/login"
                className="hover:text-black transition-colors px-3 py-1"
              >
                Member Login
              </Link>

              {/* Search Toggle Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </motion.nav>
          ) : (
            // SEARCH EXPANDED STATE (Animation from Image 3)
            <motion.div
              key="search-input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center w-full px-3"
            >
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Where would you like to go?"
                className="w-full bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 text-base"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                aria-label="Close Search"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Action Button (Join Keystone / Agent Hub with Arrow) */}
      <div className="flex items-center gap-4 z-50">
        <Link
          href="#"
          className="bg-black hover:bg-white text-white hover:text-black rounded-full px-6 py-3 text-sm font-medium tracking-wide shadow-md transition-all flex items-center gap-2 group whitespace-nowrap"
        >
          <span>Join Club Elevate</span>
          <div className="bg-white p-0.5 rounded-full group-hover:bg-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-3 h-3 text-black group-hover:text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
}
