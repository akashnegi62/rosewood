"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Data
const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    location: "New York, America",
    text: "I absolutely love this salon! From the warm welcome to the final look, everything was perfect. The staff really listened.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Esther Howard",
    location: "London, UK",
    text: "The service was exceptional. I felt like a queen for the day. Highly recommend booking an appointment here.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Wade Warren",
    location: "Paris, France",
    text: "Great atmosphere and professional staff. They knew exactly how to handle my hair type. I will be back.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Cameron Williamson",
    location: "Berlin, Germany",
    text: "A truly relaxing experience. The attention to detail is unmatched. Rare to find a place that cares this much.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    location: "Tokyo, Japan",
    text: "Best haircut I've had in years. The stylist was patient and gave great advice for my hair texture.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

function QuoteIcon({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 32"
      fill="none"
      className={className}
    >
      <path
        d="M0 32V19.556C0 8.741 6.222 2.37 18.667 0l1.777 3.556C14.37 5.037 11.11 8.296 10.222 13.333H17.78V32H0zm22.222 0V19.556C22.222 8.741 28.444 2.37 40.889 0l1.778 3.556c-6.074 1.481-9.334 4.74-10.222 9.777h7.555V32H22.222z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Clientsec() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = testimonials.length;

  // Configuration for spacing
  // Adjust these values to change how far apart the cards are
  const GAP_NEAR = 280; // Distance from center to immediate neighbor
  const GAP_FAR = 520; // Distance from center to far neighbor

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 z-10 relative font-[Vera]"
      >
        <p className="text-lg tracking-[0.3em] uppercase mb-3 text-gray-400">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-8xl font-[Vera] tracking-tight text-black">
          What Our Clients Say
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl h-112.5 flex items-center justify-center">
        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-10 z-50 w-12 h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:scale-110 hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft size={20} className="text-white" strokeWidth={2} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-10 z-50 w-12 h-12 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:scale-110 hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight size={20} className="text-white" strokeWidth={2} />
        </button>

        {/* Cards Track */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {testimonials.map((item, index) => {
            // Calculate circular distance
            let distance = index - active;
            if (distance < -total / 2) distance += total;
            if (distance > total / 2) distance -= total;

            const isActive = distance === 0;

            // --- CONFIGURATION FOR 5 CARDS VISIBLE ---
            let scale = 0.7;
            let xOffset = 0;
            let zIndex = 10;
            let opacity = 0;
            let blur = 5;

            if (isActive) {
              // CENTER CARD
              scale = 1;
              xOffset = 0;
              zIndex = 50;
              opacity = 1;
              blur = 0;
            } else if (distance === 1 || distance === -1) {
              // NEAR LEFT / RIGHT CARDS
              scale = 0.85;
              xOffset = distance * GAP_NEAR;
              zIndex = 40;
              opacity = 1;
              blur = 0;
            } else if (distance === 2 || distance === -2) {
              // FAR LEFT / RIGHT CARDS
              scale = 0.75;
              xOffset = distance * GAP_FAR;
              zIndex = 30;
              opacity = 0.7; // Slightly faded
              blur = 2;
            } else {
              // HIDDEN CARDS (Pushed way out)
              scale = 0.6;
              xOffset = distance * (GAP_FAR + 200);
              zIndex = 10;
              opacity = 0;
            }

            return (
              <motion.div
                key={item.id}
                className="absolute top-1/2 left-1/2 flex flex-col justify-between bg-black rounded-2xl p-8 cursor-pointer select-none border border-neutral-800"
                style={{
                  width: "360px",
                  minHeight: "320px",
                  // Center the pivot point
                  marginLeft: "-180px",
                  marginTop: "-160px",
                  zIndex,
                }}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 1.2,
                }}
                onClick={() => {
                  if (Math.abs(distance) === 1) {
                    if (distance === 1) next();
                    else prev();
                  } else if (Math.abs(distance) === 2) {
                    // Optional: Jump two steps if clicking far cards?
                    // Usually better to just step one by one for smoothness
                    if (distance === 2) {
                      next();
                      setTimeout(next, 100);
                    } else {
                      prev();
                      setTimeout(prev, 100);
                    }
                  }
                }}
              >
                <div>
                  <QuoteIcon
                    size={isActive ? 40 : 30}
                    className={isActive ? "text-white" : "text-neutral-700"}
                  />
                  <p
                    className={`mt-5 leading-relaxed ${isActive ? "text-white text-[15px]" : "text-neutral-400 text-[13px]"}`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    &quot;{item.text}&quot;
                  </p>
                </div>

                <div
                  className={`flex items-center gap-3 mt-6 pt-5 border-t ${isActive ? "border-neutral-800" : "border-neutral-900"}`}
                >
                  <Image
                    width={100}
                    height={100}
                    src={item.avatar}
                    alt={item.name}
                    className={`rounded-full object-cover ring-2 ring-offset-2 ring-offset-black ${isActive ? "ring-white w-12 h-12" : "ring-transparent w-10 h-10"}`}
                  />
                  <div>
                    <p
                      className={`text-white ${isActive ? "font-bold text-base" : "font-semibold text-sm"}`}
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-neutral-400 text-xs mt-0.5"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {item.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => !isAnimating && setActive(i)}
            className="focus:outline-none group"
          >
            <motion.div
              animate={{
                width: i === active ? 24 : 8,
                backgroundColor: i === active ? "#000" : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
