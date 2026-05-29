"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants, LayoutGroup } from "framer-motion";
import {
  MapPin,
  Clock,
  Compass,
  Play,
  X,
  ArrowRight,
  Search,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { itineraryData, ItineraryItem } from "./itineraryData";

// ─── Animation Variants ───────────────────────────────────────────────────────

// Card enter: fade + rise + slight scale up from below
// Card exit:  fade + shrink + fall back — feels like it "slots out"
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: -16,
    filter: "blur(6px)",
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 320 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Card Component ───────────────────────────────────────────────────────────

interface CardProps {
  item: ItineraryItem;
  onPlay: (id: string) => void;
}

function ItineraryCard({ item, onPlay }: CardProps) {
  return (
    <motion.article
      layout
      layoutId={`card-${item.id}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group flex flex-col h-full bg-white border border-neutral-200 rounded-3xl overflow-hidden
                 hover:border-neutral-400 hover:shadow-xl hover:shadow-black/5 transition-[border-color,box-shadow] duration-300"
    >
      {/* ── Image ── */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide shadow-sm">
          {item.badge}
        </span>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => onPlay(item.youtubeId)}
            aria-label={`Play video for ${item.title}`}
            className="w-14 h-14 rounded-full border border-white/40 bg-white/10 backdrop-blur-md
                       flex items-center justify-center cursor-pointer
                       hover:scale-110 hover:bg-white/20 active:scale-95
                       transition-all duration-300 shadow-lg"
          >
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-6 flex flex-col flex-1 gap-3 bg-white">
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
          <span>{item.country}</span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 leading-snug tracking-tight line-clamp-2 group-hover:text-black transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        <div className="pt-4 mt-auto border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{item.duration}</span>
          </div>
          <Link
            href={`/itinerary/${item.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700
                          border border-neutral-200 px-4 py-2 rounded-full
                          group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900
                          transition-all duration-300 cursor-pointer select-none"
          >
            Explore
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

function VideoModal({ videoId, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-black/60 border border-white/20
                         flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative pt-[56.25%] w-full bg-neutral-950">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Filter Pill Button ───────────────────────────────────────────────────────

interface PillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Pill({ active, onClick, children }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${
        active ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-800"
      }`}
    >
      {active && (
        <motion.span
          layoutId="pill-bg"
          className="absolute inset-0 bg-white rounded-xl shadow-sm"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface DurationPillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function DurationPill({ active, onClick, children }: DurationPillProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${
        active ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-800"
      }`}
    >
      {active && (
        <motion.span
          layoutId="duration-pill-bg"
          className="absolute inset-0 bg-white rounded-xl shadow-sm"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ItineraryPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<
    "all" | "india" | "international"
  >("all");
  const [selectedDuration, setSelectedDuration] = useState<
    "all" | "short" | "long"
  >("all");

  const filteredItineraries = itineraryData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const isIndia = item.country.toLowerCase().includes("india");
    let matchesRegion = true;
    if (selectedRegion === "india") matchesRegion = isIndia;
    else if (selectedRegion === "international") matchesRegion = !isIndia;

    let matchesDuration = true;
    const nightsMatch = item.duration.match(/(\d+)\s+Nights/);
    const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : 0;
    if (selectedDuration === "short") matchesDuration = nights <= 4;
    else if (selectedDuration === "long") matchesDuration = nights > 4;

    return matchesSearch && matchesRegion && matchesDuration;
  });

  const hasActiveFilters =
    searchQuery || selectedRegion !== "all" || selectedDuration !== "all";

  const handleReset = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedDuration("all");
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-24">
      <section className="max-w-7xl mx-auto px-6 mt-12">
        {/* ── Filter Panel ── */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-neutral-100/50 mb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination, country, keyword..."
                className="w-full pl-12 pr-10 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl
                           text-sm font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none
                           focus:ring-2 focus:ring-black/10 focus:border-neutral-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Region pills — shared layoutId for sliding bg */}
              <LayoutGroup id="region">
                <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200/50">
                  <Pill
                    active={selectedRegion === "all"}
                    onClick={() => setSelectedRegion("all")}
                  >
                    All
                  </Pill>
                  <Pill
                    active={selectedRegion === "india"}
                    onClick={() => setSelectedRegion("india")}
                  >
                    India
                  </Pill>
                  <Pill
                    active={selectedRegion === "international"}
                    onClick={() => setSelectedRegion("international")}
                  >
                    International
                  </Pill>
                </div>
              </LayoutGroup>

              {/* Duration pills */}
              <LayoutGroup id="duration">
                <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200/50">
                  <DurationPill
                    active={selectedDuration === "all"}
                    onClick={() => setSelectedDuration("all")}
                  >
                    Any
                  </DurationPill>
                  <DurationPill
                    active={selectedDuration === "short"}
                    onClick={() => setSelectedDuration("short")}
                  >
                    3–4 Nights
                  </DurationPill>
                  <DurationPill
                    active={selectedDuration === "long"}
                    onClick={() => setSelectedDuration("long")}
                  >
                    5–6 Nights
                  </DurationPill>
                </div>
              </LayoutGroup>

              {/* Reset */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      transition: { duration: 0.15 },
                    }}
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-3 border border-neutral-200 hover:bg-neutral-50
                               hover:border-neutral-300 rounded-2xl text-xs font-bold tracking-wider uppercase
                               text-neutral-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Result count */}
          <div className="mt-4 text-xs text-neutral-400 font-medium">
            Showing {filteredItineraries.length} of {itineraryData.length}{" "}
            itineraries
          </div>
        </div>

        {/* ── Cards Grid ── */}
        {/*
          Key insight: we do NOT use variants/staggerContainer on the grid wrapper,
          because AnimatePresence + individual card variants gives us full per-card
          enter/exit control. The grid wrapper only handles layout shifts.
        */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItineraries.map((item) => (
              <ItineraryCard
                key={item.id}
                item={item}
                onPlay={setActiveVideoId}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty State ── */}
        <AnimatePresence>
          {filteredItineraries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 200, damping: 22 },
              }}
              exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white border border-neutral-200 rounded-3xl"
            >
              <Compass className="w-12 h-12 text-neutral-300 mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                No Itineraries Found
              </h3>
              <p className="text-neutral-500 text-sm max-w-sm mb-6">
                We couldn&apos;t find any itineraries matching your current
                search or filters.
              </p>
              <button
                onClick={handleReset}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-5 py-2.5 rounded-full text-xs transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Video Modal ── */}
      <VideoModal
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </main>
  );
}
