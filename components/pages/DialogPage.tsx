"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import DoctorCard, { DoctorAgent } from "./DoctorCard";
import { Loader2 } from "lucide-react";
import { SuggestedDoctorCard } from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

const DialogPage = () => {
  const [userProblem, setUserProblem] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent>();
  const router = useRouter();
  const onClickProceed = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggestions", {
      userProblem: userProblem,
    });
    setSuggestedDoctors(result?.data);
    setLoading(false);
  };

  const onstartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/sessionchat", {
      userProblem,
      selectedDoctor,
    });
    if (result?.data?.sessionId) {
      router.push("/dashboard/conversation/" + result?.data?.sessionId);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
        Connect with Doctor
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2>Be specific about your problem and write it correctly</h2>
                <Textarea
                  className="mt-2 h-[180px]"
                  placeholder="Add your details..."
                  onChange={(e) => setUserProblem(e.target.value)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 pt-4">
                {suggestedDoctors.length == 0 ? (
                  <p>no doctors found</p>
                ) : (
                  <>
                    {suggestedDoctors &&
                      suggestedDoctors?.map((doctor, idx) => (
                        <SuggestedDoctorCard
                          doctorAgent={doctor}
                          key={idx}
                          setSelectedDoctor={() => setSelectedDoctor(doctor)}
                          //@ts-ignore
                          selectedDoctor={selectedDoctor}
                        />
                      ))}
                  </>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              //@ts-ignore
              setSuggestedDoctors(null);
            }}
          >
            cancel
          </Button>
          {!suggestedDoctors ? (
            <Button disabled={!userProblem} onClick={() => onClickProceed()}>
              {loading ? <Loader2 className="animate-spin" /> : <p>Proceed</p>}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={() => onstartConsultation()}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <p>start consultation</p>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPage;
