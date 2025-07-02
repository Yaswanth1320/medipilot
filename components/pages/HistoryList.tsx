"use client";

import { SessionType } from "@/app/(routes)/dashboard/conversation/[sessionId]/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportPage from "./ReportPage";
import { motion } from "framer-motion";

type props = {
  historyList: SessionType[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

function HistoryList({ historyList }: props) {
  return (
    <div className="rounded-lg w-full">
      <Table>
        <TableCaption className="text-slate-400 mt-4">
          A list of your previous consultations.
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b-slate-700 hover:bg-slate-800/50">
            <TableHead className="w-[150px] text-slate-300 text-center">
              AI Medical Agent
            </TableHead>
            <TableHead className="text-slate-300 text-center">
              Description
            </TableHead>
            <TableHead className="text-slate-300 text-center">Date</TableHead>
            <TableHead className="text-center text-slate-300">Report</TableHead>
          </TableRow>
        </TableHeader>
        <motion.tbody
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {historyList.map((consultation: SessionType) => (
            <motion.tr
              key={consultation.id}
              //@ts-ignore
              variants={rowVariants}
              className="border-b-slate-800 transition-colors hover:bg-slate-800/50"
            >
              <TableCell className="font-medium text-white text-center">
                {consultation?.selectedDoctor?.specialist}
              </TableCell>
              <TableCell className="text-slate-300 text-center">
                {consultation?.notes}
              </TableCell>
              <TableCell className="text-slate-400 text-center">
                {consultation?.createdOn
                  ? new Date(consultation.createdOn).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell className="text-center text-slate-300">
                <ReportPage record={consultation} />
              </TableCell>
            </motion.tr>
          ))}
        </motion.tbody>
      </Table>
    </div>
  );
}

export default HistoryList;