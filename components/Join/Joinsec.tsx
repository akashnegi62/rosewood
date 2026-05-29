"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

// Types

type Plan = {
  years: number;
  emi: string;
  total: string;
  badge?: string;
};

type Tier = {
  id: string;
  label: string;
  sub: string;
  cardbg: string;
  cardtext: string;
  cardsvg: string;
  cardbtn: string;
  plans: Plan[];
};

// Data
const TIERS: Tier[] = [
  {
    id: "ebony",
    label: "EBONY",
    sub: "Studio",
    cardbg: "#000000",
    cardtext: "#F5F0E8",
    cardsvg: "#ffffff",
    cardbtn: "#C8A96E",
    plans: [
      { years: 20, emi: "₹26,414/-", total: "₹11,65,000/-" },
      { years: 15, emi: "₹22,106/-", total: "₹9,75,000/-", badge: "Popular" },
      { years: 10, emi: "₹28,704/-", total: "₹7,40,000/-" },
      { years: 5, emi: "₹41,200/-", total: "₹4,95,000/-" },
    ],
  },
  {
    id: "ivory",
    label: "IVORY",
    sub: "Studio",
    cardbg: "#EAE6DD",
    cardtext: "#1A1612",
    cardsvg: "#191818",
    cardbtn: "#1A1612",
    plans: [
      { years: 20, emi: "₹17,571/-", total: "₹7,75,000/-" },
      { years: 15, emi: "₹14,964/-", total: "₹6,60,000/-", badge: "Popular" },
      { years: 10, emi: "₹19,783/-", total: "₹5,10,000/-" },
      { years: 5, emi: "₹28,500/-", total: "₹3,30,000/-" },
    ],
  },
  {
    id: "jade",
    label: "JADE",
    sub: "Studio",
    cardbg: "#165B54",
    cardtext: "#FFFFFF",
    cardsvg: "#ffffff",
    cardbtn: "#fff",
    plans: [
      { years: 20, emi: "₹11,797/-", total: "₹5,55,000/-" },
      { years: 15, emi: "₹10,309/-", total: "₹4,85,000/-", badge: "Popular" },
      { years: 10, emi: "₹14,364/-", total: "₹3,95,000/-" },
      { years: 5, emi: "₹20,600/-", total: "₹2,45,000/-" },
    ],
  },
];

// Plan Card

function PlanCard({
  plan,
  tier,
  index,
}: {
  plan: Plan;
  tier: Tier;
  index: number;
  isActive: boolean;
}) {
  const [compared, setCompared] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 16;
    const rY = (mouseX / width) * 16;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      key={plan.years}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative shrink-0 w-full sm:w-90 min-h-80 rounded-3xl border overflow-hidden transition-all duration-150 ease-out shadow-lg select-none"
      style={{
        transform,
        background: tier.cardbg,
        borderColor: `${tier.cardsvg}22`,
      }}
    >
      {/* SVG Absolute Top-Right Background Grid Curve */}
      <div
        className="absolute top-0 right-0 w-72 h-48 pointer-events-none select-none opacity-[0.25] z-0"
        style={{ color: tier.cardsvg }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-current fill-none stroke-[0.75]"
        >
          <path d="M30,-20 Q80,20 130,40 M10,-20 Q70,30 130,60 M-10,-20 Q60,40 130,80 M-30,-20 Q50,50 130,100" />
        </svg>
      </div>

      <div className="p-6 md:p-7 relative z-10 flex flex-col justify-between min-h-80">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p
                className="text-lg tracking-widest font-black uppercase"
                style={{ color: tier.cardsvg }}
              >
                {tier.label}
              </p>
              <p
                className="text-sm font-medium mt-0.5"
                style={{ color: tier.cardtext, opacity: 0.6 }}
              >
                {tier.sub}
              </p>
            </div>
            <div
              className="text-sm font-bold px-3 py-1.5 rounded-lg"
              style={{ background: tier.cardsvg + "18", color: tier.cardsvg }}
            >
              {plan.years} Yrs
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6"
            style={{ background: `${tier.cardsvg}22` }}
          />

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <p
                className="text-[11px] mb-1"
                style={{ color: tier.cardtext, opacity: 0.6 }}
              >
                EMI Starts at
              </p>
              <p
                className="text-lg font-bold leading-tight"
                style={{ color: tier.cardtext }}
              >
                {plan.emi}
              </p>
            </div>
            <div>
              <p
                className="text-[11px] mb-1"
                style={{ color: tier.cardtext, opacity: 0.6 }}
              >
                Total Cost
              </p>
              <p
                className="text-lg font-bold leading-tight"
                style={{ color: tier.cardtext }}
              >
                {plan.total}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer"
            style={{ background: tier.cardbtn, color: tier.cardbg }}
          >
            Buy Now <ArrowRight size={14} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCompared((p) => !p)}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
            style={{
              borderColor: compared ? tier.cardsvg : `${tier.cardsvg}22`,
              color: compared ? tier.cardsvg : tier.cardtext,
              background: compared ? tier.cardsvg + "12" : "transparent",
            }}
          >
            {compared ? (
              <>
                <BadgeCheck size={12} /> Added to Compare
              </>
            ) : (
              <>+ Add to Compare</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Tier Section

function TierSection({ tier }: { tier: Tier }) {
  const [offset, setOffset] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxOffset = Math.max(0, tier.plans.length - cardsToShow);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset((o) => Math.min(o, maxOffset));
  }, [cardsToShow, maxOffset]);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));
  const visible = tier.plans.slice(offset, offset + cardsToShow);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20 w-full max-w-6xl mx-auto px-4 md:px-0"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-6 w-full">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-black tracking-[0.12em] uppercase text-white"
          >
            {tier.label}
          </motion.h2>
          <div className="h-0.5 mt-1.5 w-12 rounded-full bg-white/30" />
        </div>

        <div className="flex gap-2">
          {[
            { fn: prev, icon: ChevronLeft, disabled: offset === 0 },
            { fn: next, icon: ChevronRight, disabled: offset >= maxOffset },
          ].map(({ fn, icon: Icon, disabled }, i) => (
            <motion.button
              key={i}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.9 } : {}}
              onClick={fn}
              disabled={disabled}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
              style={{
                borderColor: disabled ? "#333" : "#fff",
                color: disabled ? "#444" : "#fff",
                background: disabled
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.08)",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="relative overflow-hidden w-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={offset}
            className="flex gap-4 w-full md:w-fit justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {visible.map((plan, i) => (
              <PlanCard
                key={plan.years}
                plan={plan}
                tier={tier}
                index={i}
                isActive={plan.badge === "Popular"}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-5 justify-center">
        {Array.from({ length: maxOffset + 1 }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setOffset(i)}
            animate={{
              width: i === offset ? 20 : 6,
              opacity: i === offset ? 1 : 0.25,
            }}
            transition={{ duration: 0.25 }}
            className="h-1.5 rounded-full bg-white"
          />
        ))}
      </div>
    </motion.section>
  );
}

// Page

export default function JoinSec() {
  return (
    <main className="min-h-screen bg-black px-6 py-16">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white mb-3">
            Investment Plans
          </p>
          <h1 className="text-5xl font-black tracking-tight text-white mb-4">
            Choose Your{" "}
            <span className="bg-linear-to-r from-[#C8A96E] via-[#E8C98E] to-[#4ECCA3] bg-clip-text text-transparent">
              Tier
            </span>
          </h1>
          <p className="text-white max-w-md mx-auto text-sm leading-relaxed">
            Flexible EMI plans across three premium tiers. Now with a new 5‑year
            quick‑pay option.
          </p>
        </motion.div>

        {/* Tier sections */}
        {TIERS.map((tier) => (
          <TierSection key={tier.id} tier={tier} />
        ))}
      </div>
    </main>
  );
}
