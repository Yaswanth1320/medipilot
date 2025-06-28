"use-client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { AIDoctorAgents } from "@/constants/list";
import DoctorCard from "./DoctorCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};



export const AiDoctorsList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="mb-4 text-xl font-bold text-slate-100">
        AI Doctors Expert
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {AIDoctorAgents.map((doctor) => (
          <DoctorCard doctorAgent={doctor} key={doctor.id} />
        ))}
      </motion.div>
    </motion.div>
  );
};
