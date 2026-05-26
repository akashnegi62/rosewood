"use client";

import React from "react";
import Image from "next/image";

export default function Imagesec() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden select-none">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <Image
          src="/Img/clubelevate.png"
          alt="Club Elevate"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </main>
  );
}
