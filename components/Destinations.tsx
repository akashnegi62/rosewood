"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// --- Types ---
interface SlideData {
  id: number;
  country: string;
  title: string;
  imageUrl: string;
  type: string;
}

// --- Mock Data ---
const slides: SlideData[] = [
  {
    id: 1,
    country: "Japan",
    title: "In het hart van Honshu",
    imageUrl: "/medias/63257/resize/1100x0/shutterstock-1220336509.webp",
    type: "Individuele reis",
  },
  {
    id: 2,
    country: "Tibet & China",
    title: "Het dak van de wereld met de Hemeltrein",
    imageUrl: "/medias/74624/resize/1100x0/billow926-304JgmUi1e8-unsplash.webp",
    type: "Individuele reis",
  },
  {
    id: 3,
    country: "Costa Rica",
    title: "Het wilde zuiden van Costa Rica",
    imageUrl:
      "/medias/54854/resize/1100x0/Turrialbashutterstock-1062463487.webp",
    type: "Individuele reis",
  },
  {
    id: 4,
    country: "Mexico",
    title: "Tesoros de México",
    imageUrl: "/medias/87750/resize/1100x0/Pueblashutterstock-125210186.webp",
    type: "Individuele reis",
  },
  {
    id: 5,
    country: "Egypte",
    title: "Eeuwigheid langs de Nijl",
    imageUrl: "/medias/94219/resize/1100x0/KARNAK-TEMPLE-1.webp",
    type: "Groep",
  },
  {
    id: 6,
    country: "Marokko",
    title: "Van Atlas tot Sahara",
    imageUrl: "/medias/94167/resize/1100x0/MERZOUGA-2.webp",
    type: "Individuele reis",
  },
  {
    id: 7,
    country: "Kaapverdië",
    title: "Fogo & Santiago",
    imageUrl: "/medias/92434/resize/1100x0/Fogo-Ingrid.webp",
    type: "Individuele reis",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="bg-white text-black py-24 px-4 overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header Block */}
        <div className="text-center flex flex-col items-center">
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

        {/* Carousel Container */}
        <div className="relative w-full h-150 bg-white overflow-hidden flex items-center justify-center">
          {/* Carousel Track */}
          <div className="relative w-full h-full max-w-400 flex items-center justify-center">
            {slides.map((slide, index) => {
              // Calculate distance from current index for circular carousel logic
              let distance = index - currentIndex;
              if (distance < -slides.length / 2) distance += slides.length;
              if (distance > slides.length / 2) distance -= slides.length;

              // Determine styles based on distance
              // We use 'distance' to determine scale, x-position, and z-index
              const isActive = distance === 0;

              // Visual configuration
              let scale = 0.7;
              let xOffset = 0;
              let zIndex = 10;
              let opacity = 0.5;

              // Config for "6 images in frame" look
              // We want side images to be visible but smaller and offset
              if (isActive) {
                scale = 1;
                xOffset = 0;
                zIndex = 50;
                opacity = 1;
              } else if (Math.abs(distance) === 1) {
                scale = 0.88;
                xOffset = distance > 0 ? 320 : -320; // Closer spacing to fit more
                zIndex = 40;
                opacity = 1; // Clean images, no fade
              } else if (Math.abs(distance) === 2) {
                scale = 0.78;
                xOffset = distance > 0 ? 560 : -560;
                zIndex = 30;
                opacity = 1; // Clean images
              } else if (Math.abs(distance) === 3) {
                scale = 0.68;
                xOffset = distance > 0 ? 740 : -740;
                zIndex = 20;
                opacity = 0.8; // Slight opacity for outer edges
              } else {
                // Hide slides that are too far away
                scale = 0.6;
                xOffset = distance > 0 ? 900 : -900;
                zIndex = 10;
                opacity = 0;
              }

              return (
                <motion.div
                  key={slide.id}
                  className="absolute top-1/2 left-1/2 w-125 h-100 -ml-62.5 -mt-50 rounded-sm overflow-hidden cursor-pointer shadow-xl bg-white"
                  style={{
                    zIndex,
                  }}
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  }}
                  onClick={() => {
                    // Click side slides to navigate
                    if (distance === 1) nextSlide();
                    if (distance === -1) prevSlide();
                  }}
                >
                  {/* Image Container - Clean, no brightness filter */}
                  <div className="relative w-full h-full">
                    <Image
                      // Fallback to picsum if relative path fails in demo
                      src={`https://picsum.photos/seed/${slide.id}/1200/900`}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Overlay - Only fully visible on active slide */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/10">
                    {/* Badge */}
                    <div
                      className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-black px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    >
                      <Sparkles size={10} />
                      {slide.type}
                    </div>

                    {/* Text Content */}
                    <div
                      className={`transition-all duration-500 transform ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <p className="font-serif italic text-lg mb-2 opacity-90 drop-shadow-md">
                        {slide.country}
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight uppercase max-w-[80%] mx-auto drop-shadow-md">
                        {slide.title}
                      </h2>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-100">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
