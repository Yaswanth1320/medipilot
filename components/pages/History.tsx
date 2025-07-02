"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import DialogPage from "./DialogPage";
import axios from "axios";
import HistoryList from "./HistoryList";
import { SessionType } from "@/app/(routes)/dashboard/conversation/[sessionId]/page";
import { Loader2 } from "lucide-react";

export const History = () => {
  const [history, setHistory] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    setLoading(true);
    const result = await axios.get("/api/sessionchat?sessionId=all");
    setHistory(result.data);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-neutral-800 p-8 text-center"
    >
      {history.length == 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center">
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
          <p className="text-neutral-400">
            You do not have any previous history
          </p>
          <DialogPage />
        </div>
      ) : (
        <div className="w-full">
          {loading ? (
            <div className="flex items-center justify-center text-white flex-col gap-2">
              <Loader2 className="text-white animate-spin" />
              Loading
            </div>
          ) : (
            <HistoryList historyList={history} />
          )}
        </div>
      )}
    </motion.div>
  );
};
