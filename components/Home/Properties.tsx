"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Tanzania",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=85",
  },
  {
    id: 2,
    name: "Uganda",
    image:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=85",
  },
  {
    id: 3,
    name: "Namibia",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=85",
  },
  {
    id: 4,
    name: "Botswana",
    image:
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=600&q=85",
  },
  {
    id: 5,
    name: "Kenya",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=85",
  },
  {
    id: 6,
    name: "Zimbabwe",
    image:
      "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=85",
  },
];

const VISIBLE = 4; // cards visible at once

export default function Properties() {
  const [offset, setOffset] = useState(0); // how many cards scrolled
  const maxOffset = destinations.length - VISIBLE;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section className="w-full min-h-screen bg-white flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* 1. Header Block */}
        <div className="text-center flex flex-col items-center mb-16">
          <motion.div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800/80 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Explore 200+ Resorts
          </motion.div>
          <h2 className="text-4xl md:text-8xl font-[Vera] tracking-tight text-black mb-4">
            Popular Resorts
          </h2>
          <p className="text-neutral-800 font-light text-sm md:text-lg max-w-xl leading-relaxed">
            From oceanfront luxury villas to secluded mountain retreats, find your perfect resort getaway.
          </p>
        </div>

        {/* Navigation & Cards Wrapper */}
        <div className="w-full flex flex-col">
          {/* Nav arrows — horizontal, rounded-full, positioned right */}
          <div className="flex justify-end gap-3 mb-6">
            <motion.button
              onClick={prev}
              disabled={offset === 0}
              whileTap={offset > 0 ? { scale: 0.94 } : {}}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-30"
            >
              <ArrowLeft size={18} strokeWidth={1.8} className="text-white" />
            </motion.button>
            <motion.button
              onClick={next}
              disabled={offset >= maxOffset}
              whileTap={offset < maxOffset ? { scale: 0.94 } : {}}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-30"
            >
              <ArrowRight size={18} strokeWidth={1.8} className="text-white" />
            </motion.button>
          </div>

          {/* Cards strip */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex gap-3"
              animate={{ x: `calc(-${offset} * (25% + 0.75rem))` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              style={{ width: `${(destinations.length / VISIBLE) * 100}%` }}
            >
              {destinations.map((dest, i) => (
                <DestCard key={dest.id} dest={dest} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestCard({
  dest,
  index,
}: {
  dest: (typeof destinations)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative shrink-0 overflow-hidden rounded-sm cursor-pointer"
      style={{
        width: `calc(${((100 / destinations.length) * VISIBLE) / VISIBLE}% )`,
        flex: `0 0 calc(${100 / destinations.length}%)`,
        aspectRatio: "3 / 4.2",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image with zoom on hover */}
      <motion.img
        src={dest.image}
        alt={dest.name}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)",
        }}
      />

      {/* Label */}
      <div className="absolute bottom-5 left-5 z-10">
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-1"
          style={{
            color: "#c9a84c",
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          Destination
        </p>
        <motion.p
          className="text-white uppercase"
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {dest.name}
        </motion.p>
      </div>

      {/* Hover shine sweep */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
