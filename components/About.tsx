"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-black text-white min-h-screen w-full overflow-hidden flex items-center py-16 lg:py-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-6 sm:px-12 lg:px-16 items-center">
        {/* LEFT COLUMN: EDITORIAL CONTENT SECTION (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center text-left z-10"
        >
          {/* Micro-Header Tag */}
          <span className="text-[10px] md:text-sm font-[Vera] tracking-[0.3em] text-neutral-400 uppercase mb-6 block">
            About Rosewood Worldwide Travel
          </span>

          {/* Luxury High-Contrast Headline */}
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-[Vera] tracking-normal text-white mb-8 leading-[1.15]">
            We&apos;re Dedicated To Making Your Travel Simple &amp; Fun
          </h2>

          {/* Multi-Paragraph Content Block matching the text length in your screenshot */}
          <div className="space-y-6 text-neutral-300 font-light text-sm xl:text-base leading-relaxed tracking-wide max-w-xl">
            <p>
              A holiday is more than just sightseeing. It&apos;s about enjoying
              exclusive experiences, unique accommodations across different terrains, and
              unparalleled privileges. That&apos;s what being a Rosewood member is all about.
            </p>

            <p>
              We believe travel has a way of turning things around—bringing back
              inspiration and reminding us to appreciate the finer things. Let us inspire
              you to start living the life you were meant to live.
            </p>

            <p className="font-semibold text-white mt-4">
              Rosewood Worldwide Travel ( A Division of Rosewood Hotels and Resorts Pvt Ltd )
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: HARD-EDGED VISUAL MEDIA BLOCK (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative aspect-4/3 lg:aspect-square xl:aspect-4/3 w-full rounded-sm overflow-hidden select-none shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85"
            alt="Thrilling Adventure Travel Experience"
            fill
            sizes="(max-w-1024px) 100vw, 55vw"
            priority
            className="object-cover object-center brightness-[0.8] contrast-[1.02]"
          />
        </motion.div>
      </div>
    </section>
  );
}
