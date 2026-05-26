"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Flame,
  Sparkles,
  Percent,
} from "lucide-react";

// Animation Variants for orchestrated fade-in
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden flex flex-col justify-between">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Vacation Background"
          fill
          priority
          quality={90}
          className="object-cover object-center brightness-[0.35]"
        />
        {/* Vignette & Bottom shading overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-neutral-950" />
      </div>

      {/* 3. Hero Content Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grow max-w-5xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center mt-28 mb-12"
      >
        {/* Micro-Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-black backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Explore 200+ Destinations
        </motion.div>

        {/* Hero Headlines */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-8xl font-[Vera] tracking-tight text-white max-w-4xl leading-tightest"
        >
          Discover Your Next <br />
          <span className="bg-linear-to-r from-cyan-400 via-white to-cyan-500 bg-clip-text text-transparent">
            Dream Vacation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-xl text-white max-w-2xl font-medium mt-4 mb-10 leading-relaxed"
        >
          Explore luxury boutique resorts and tailored holiday experiences.
        </motion.p>

        {/* 4. Capsule Booking Bar */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-black backdrop-blur-md p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center justify-between gap-1 max-w-4xl"
        >
          {/* Destination Field */}
          <div className="flex items-center gap-3 px-5 py-2.5 w-full md:w-1/4 hover:bg-neutral-800/40 rounded-full transition group cursor-pointer">
            <MapPin className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left w-full">
              <span className="block text-[10px] text-white uppercase tracking-widest font-semibold">
                Destination
              </span>
              <input
                type="text"
                placeholder="Where to?"
                className="bg-transparent text-sm text-white placeholder-white focus:outline-none w-full font-medium"
              />
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-white" />

          {/* Check-In Field */}
          <div className="flex items-center gap-3 px-5 py-2.5 w-full md:w-1/4 hover:bg-neutral-800/40 rounded-full transition group cursor-pointer relative">
            <Calendar className="w-5 h-5 text-white shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[10px] text-white uppercase tracking-widest font-semibold">
                Check-In
              </span>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="bg-transparent text-sm text-white placeholder-white focus:outline-none w-full font-medium cursor-pointer"
              />
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-white" />

          {/* Check-Out Field */}
          <div className="flex items-center gap-3 px-5 py-2.5 w-full md:w-1/4 hover:bg-neutral-800/40 rounded-full transition group cursor-pointer">
            <Calendar className="w-5 h-5 text-white shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[10px] text-white uppercase tracking-widest font-semibold">
                Check-Out
              </span>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="bg-transparent text-sm text-white placeholder-white focus:outline-none w-full font-medium cursor-pointer"
              />
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-white" />

          {/* Travelers Field */}
          <div className="flex items-center gap-3 px-5 py-2.5 w-full md:w-1/4 hover:bg-neutral-800/40 rounded-full transition group cursor-pointer">
            <Users className="w-5 h-5 text-white shrink-0" />
            <div className="text-left w-full">
              <span className="block text-[10px] text-white uppercase tracking-widest font-semibold">
                Travelers
              </span>
              <select className="bg-transparent text-sm text-white focus:outline-none w-full font-medium appearance-none cursor-pointer">
                <option value="1" className="bg-neutral-900">
                  1 Adult
                </option>
                <option value="2" className="bg-neutral-900">
                  2 Adults
                </option>
                <option value="4" className="bg-neutral-900">
                  Family (4+)
                </option>
              </select>
            </div>
          </div>

          {/* Action CTA Button */}
          <button className="w-full md:w-auto bg-white text-black font-medium rounded-full px-6 py-3.5 flex items-center justify-center gap-2 transition duration-200 whitespace-nowrap shadow-md group">
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Explore Now</span>
          </button>
        </motion.div>

        {/* 5. Pill Filter Quick Shortcuts (Bottom Links) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <button className="flex items-center gap-2 bg-black backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-white">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>Trending Packages</span>
          </button>

          <button className="flex items-center gap-2 bg-black backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Luxury Resorts</span>
          </button>

          <button className="flex items-center gap-2 bg-black backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-white">
            <Percent className="w-3.5 h-3.5 text-emerald-500" />
            <span>Today&apos;s Deals</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Safe buffer for clean alignment spacing */}
      <div className="w-full h-8 z-10" />
    </main>
  );
}
