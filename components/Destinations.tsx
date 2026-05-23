"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const DESTINATIONS = [
  {
    id: 1,
    country: "Japan",
    title: "In het hart van Honshu",
    tag: "Individuele Reis",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    country: "Tibet & China",
    title: "HET DAK VAN DE WERELD MET DE HEMELTREIN",
    tag: "Individuele Reis",
    image:
      "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    country: "Costa Rica",
    title: "Het wilde zuiden van Costa Rica",
    tag: "Individuele Reis",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    country: "Mexico",
    title: "Tesoros de México",
    tag: "Individuele Reis",
    image:
      "https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Destinations() {
  const [activeIndex, setActiveIndex] = useState(1);

  // Boundary checks to verify if we are at the edge limits
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === DESTINATIONS.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="bg-white text-black py-24 px-4 overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header Block */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div className="inline-flex items-center gap-2 bg-black backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Explore 200+ Destinations
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black mb-4">
            Popular Destinations
          </h2>
          <p className="text-black/90 font-medium text-sm md:text-lg max-w-xl leading-relaxed">
            From pristine beaches to snow-capped mountains, find your perfect
            getaway.
          </p>
        </div>

        {/* 2. Focused Carousel Container */}
        <div className="relative flex items-center justify-center h-130 md:h-115 w-full">
          <div className="relative w-full max-w-6xl overflow-visible flex items-center justify-center">
            {/* The sliding track centered perfectly via CSS calc */}
            <motion.div
              animate={{
                x: `calc(25% - (${activeIndex} * 50%) - (${activeIndex} * 24px))`,
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 22,
                mass: 0.8,
              }}
              className="flex items-center gap-6 md:gap-8 w-full justify-start"
            >
              {DESTINATIONS.map((item, index) => {
                const isCenter = index === activeIndex;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1.05 : 0.92,
                      zIndex: isCenter ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 170, damping: 22 }}
                    className="relative flex flex-col cursor-pointer shrink-0 w-[70%] sm:w-[50%] transition-all duration-300"
                  >
                    {/* Card Image Area */}
                    <div className="relative aspect-4/3 w-full overflow-hidden shadow-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-w-768px) 100vw, 600px"
                        className="object-cover brightness-[0.85] hover:scale-105 transition-transform duration-700"
                      />

                      {/* Tag Badge overlay */}
                      <div className="absolute top-4 right-4 bg-white/95 text-black/90 text-[10px] tracking-wider font-medium px-3 py-1.5 rounded flex items-center gap-1.5 shadow-sm z-20">
                        <Sparkles className="w-3 h-3 text-black/90" />
                        <span className="uppercase">{item.tag}</span>
                      </div>

                      {/* Center Overlay Text */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: isCenter ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6 md:p-10 text-center pointer-events-none"
                      >
                        <span className="text-cyan-400 font-medium text-sm md:text-base mb-1">
                          {item.country}
                        </span>
                        <h3 className="text-white text-xl md:text-3xl font-medium tracking-wide leading-tight uppercase">
                          {item.title}
                        </h3>
                      </motion.div>
                    </div>

                    {/* Non-Center Details underneath */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: !isCenter ? 1 : 0,
                        y: !isCenter ? 0 : 4,
                      }}
                      transition={{ duration: 0.2 }}
                      className="pt-4 text-left pointer-events-none"
                    >
                      <span className="text-xs text-black font-medium block mb-0.5">
                        {item.country}
                      </span>
                      <h4 className="text-black text-sm font-medium truncate tracking-wide">
                        {item.title}
                      </h4>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* 3. Slider Navigation Utilities */}
        <div className="flex items-center justify-center gap-3 max-w-6xl mx-auto mt-8 px-4">
          <button
            onClick={handlePrev}
            disabled={isFirstSlide}
            className={`p-3 rounded-full transition active:scale-95 text-white bg-black 
              ${
                isFirstSlide
                  ? "bg-black/90 text-white cursor-not-allowed active:scale-100"
                  : ""
              }`}
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={isLastSlide}
            className={`p-3 rounded-full transition active:scale-95 text-white bg-black
              ${
                isLastSlide
                  ? "bg-black/90 text-white cursor-not-allowed active:scale-100"
                  : ""
              }`}
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
