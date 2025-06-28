"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import DialogPage from "./DialogPage";

export const History = () => {
  const [history, setHistory] = useState([]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-neutral-800 p-8 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-15 w-15 text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-neutral-400">You do not have any previous history</p>
      {/* <button className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Connect with Doctor
      </button> */}
      <DialogPage />
    </motion.div>
  );
};
