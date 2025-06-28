"use client";
import React from "react";
import { motion } from "framer-motion";
import { History } from "@/components/pages/History";
import { AiDoctorsList } from "@/components/pages/AiDoctorsList";
import DialogPage from "@/components/pages/DialogPage";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 h-auto mt-13 pb-13">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold text-slate-100">My Workspace</h1>
        <DialogPage />
      </motion.div>
      <History />
      <AiDoctorsList />
    </div>
  );
};

export default Dashboard;
