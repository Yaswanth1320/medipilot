"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  const headline = "Your AI Co-pilot for Superior Patient Care";
  const subheadline =
    "Medipilot reduces administrative burden and enhances diagnostic accuracy, freeing you to focus on what matters most—your patients.";

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-800/80">
        <div className="absolute bottom-0 h-40 w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-3xl font-bold text-slate-100 md:text-5xl lg:text-7xl">
          {headline.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-lg font-normal text-neutral-400"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={"/sign-in"}>
            <button className="w-60 transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
              Get started
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
