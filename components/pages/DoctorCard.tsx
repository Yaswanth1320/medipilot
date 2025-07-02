"use client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

export type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

type Props = {
  doctorAgent: DoctorAgent;
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
};

const DoctorCard = ({ doctorAgent }: Props) => {
  return (
    <motion.div
      //@ts-ignore
      variants={itemVariants}
      whileHover={{
        y: -6,
        boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 relative"
    >
      {doctorAgent.subscriptionRequired && (
        <Badge
          variant="default"
          className="absolute right-2 text-[10px] mt-2 z-50"
        >
          Premium
        </Badge>
      )}
      <div className="relative h-74 w-full">
        <Image
          src={doctorAgent?.image}
          alt={`Image of a ${doctorAgent?.specialist}`}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-grow flex-col p-4">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white">
            {doctorAgent?.specialist}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            {doctorAgent?.description}
          </p>
        </div>
        {/* <button className="mt-2 w-full rounded-lg bg-neutral-800 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
          Start Consultation
        </button> */}
      </div>
    </motion.div>
  );
};

export default DoctorCard;
