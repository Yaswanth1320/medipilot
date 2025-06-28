"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export function NavBar() {
  const { user } = useUser();
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute top-0 left-0 z-50 flex w-full items-center justify-between border-b border-neutral-200/20 px-4 py-4 md:px-8 dark:border-neutral-800/50"
    >
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-blue-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
        </svg>
        <h1 className="text-xl font-bold md:text-2xl text-slate-100">
          Medipilot
        </h1>
      </div>

      {!user ? (
        <Link href={"/sign-in"}>
          <button className="transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200">
            Sign In
          </button>
        </Link>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      )}
    </motion.nav>
  );
}
