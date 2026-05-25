"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck,
  MapPinned,
  BadgeDollarSign,
  UserRound,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    num: "01",
    icon: CalendarCheck,
    title: "Easy Booking Process",
    color: "#e8896a",
  },
  {
    num: "02",
    icon: MapPinned,
    title: "Travel Arrangements",
    color: "#5abcb0",
  },
  {
    num: "03",
    icon: BadgeDollarSign,
    title: "Affordable Price",
    color: "#e8896a",
  },
  {
    num: "04",
    icon: UserRound,
    title: "Private Guide",
    color: "#5abcb0",
  },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Getstarted() {
  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── LEFT — image composition ── */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: 520 }}
        >
          {/* Large image */}
          <FadeUp delay={0.1}>
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                width: "min(380px, 80vw)",
                aspectRatio: "3/4",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85"
                alt="Mountain travel"
                fill
                sizes="(max-w-768px) 80vw, 380px"
                className="object-cover"
              />
              {/* Inner gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12,17,23,0.6) 0%, transparent 55%)",
                }}
              />
            </div>
          </FadeUp>
        </div>

        {/* ── RIGHT — content ── */}
        <div className="flex flex-col">
          {/* Headline */}
          <FadeUp delay={0.25}>
            <h2
              className="text-white leading-[1.1] mb-3 font-[Vera]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Get Started with{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #e8896a, #e8c46a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Rosewood
              </span>
              <br />
              Worldwide Travel.
            </h2>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.35}>
            <p
              className="text-white/50 leading-relaxed mb-10"
              style={{
                fontSize: "0.95rem",
                maxWidth: 480,
              }}
            >
              For people who want to explore and try new experiences of life by
              travelling — our company makes your journey more memorable,
              exciting, and deeply personal.
            </p>
          </FadeUp>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map(({ num, icon: Icon, title, color }, i) => (
              <FadeUp key={num} delay={0.4 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: `${color}50` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex gap-4 p-4 rounded-2xl border border-white/6 cursor-default"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={17} color={color} strokeWidth={1.7} />
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="text-white/90 text-sm font-medium">{title}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* CTA row */}
          <FadeUp delay={0.85}>
            <div className="flex items-center gap-4 flex-wrap">
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-medium text-sm"
                style={{
                  background: "#0e7490",
                  letterSpacing: "0.05em",
                }}
              >
                Start now
                <ArrowRight size={15} strokeWidth={2} />
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                <span>View destinations</span>
                <ArrowRight size={13} strokeWidth={1.5} />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
