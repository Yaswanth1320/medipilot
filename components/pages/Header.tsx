"use client";

import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/history", label: "History" },
  { href: "/dashboard/pricing", label: "Pricing" },
  { href: "/dashboard/settings", label: "Settings" },
];

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      // Changed py-3 to py-4 to increase vertical padding
      className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-800 bg-black px-4 py-4 md:px-8"
    >
      {/* Left Section: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-blue-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
        </svg>
        {/* Added md:text-2xl to match the NavBar's font size on larger screens */}
        <h1 className="text-xl font-bold text-slate-100 md:text-2xl">
          Medipilot
        </h1>
      </Link>

      {/* Center Section: Navigation Links (hidden on small screens) */}
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[1rem] font-medium text-neutral-400 transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right Section: User Profile */}
      <div className="flex items-center">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </div>
    </motion.header>
  );
};

export default Header;