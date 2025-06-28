"use client";

import { motion } from "framer-motion";
import React from "react";
import { features } from "@/constants/features";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          A Smarter Workflow is Here
        </motion.h2>

        <div className="-ml-px -mt-px border-t border-l border-neutral-800">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                //@ts-ignore
                variants={itemVariants}
                // --- HOVER EFFECT PROPS START ---
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer border-b border-r border-neutral-800 p-8 transition-colors duration-300 hover:bg-neutral-900"
                // --- HOVER EFFECT PROPS END ---
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

