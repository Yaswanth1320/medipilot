"use client";
import { DoctorAgent } from "@/components/pages/DoctorCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, Loader2, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionType = {
  id: number;
  sessionId: string;
  notes: string;
  conversation: JSON;
  selectedDoctor: DoctorAgent;
  report: JSON;
  createdBy: string | null;
  createdOn: string | null;
};

type messages = {
  role: string;
  text: string;
};

const VoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionType>();
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscripts, setLiveTranscripts] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      getSessionDetails();
    }
  }, [sessionId]);

  useEffect(() => {
    if (!vapiInstance) return;
    const handleCallStart = () => {
      console.log("Call started");
      setCallStarted(true);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallStarted(false);
      setVapiInstance(null);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;

        if (transcriptType === "partial") {
          setLiveTranscripts(transcript);
          setCurrentRole(role);
        } else if (transcriptType === "final") {
          setMessages((prev) => [...prev, { role: role, text: transcript }]);
          setLiveTranscripts("");
          setCurrentRole(null);
        }
      }
    };

    const handleSpeechStart = () => {
      console.log("Assistant started speaking");
      setCurrentRole("assistant");
    };

    const handleSpeechEnd = () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("user");
    };

    // Add event listeners
    vapiInstance.on("call-start", handleCallStart);
    vapiInstance.on("call-end", handleCallEnd);
    vapiInstance.on("message", handleMessage);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);

    // Return a cleanup function
    return () => {
      console.log("Cleaning up Vapi listeners");
      vapiInstance.off("call-start", handleCallStart);
      vapiInstance.off("call-end", handleCallEnd);
      vapiInstance.off("message", handleMessage);
      vapiInstance.off("speech-start", handleSpeechStart);
      vapiInstance.off("speech-end", handleSpeechEnd);
    };
  }, [vapiInstance]);

  const getSessionDetails = async () => {
    try {
      const result = await axios.get("/api/sessionchat?sessionId=" + sessionId);
      setSessionDetails(result?.data);
    } catch (error) {
      console.error("Failed to get session details:", error);
    }
  };

  const startCall = async () => {
    setLoading(true);
    if (!sessionDetails?.selectedDoctor?.voiceId) {
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    try {
      const res = await axios.post("/api/createAssistant", {
        voiceId: sessionDetails?.selectedDoctor?.voiceId,
        systemPrompt: sessionDetails?.selectedDoctor?.agentPrompt,
      });

      const { assistantId } = res.data;
      if (assistantId) {
        vapi.start(assistantId);
      } else {
        console.error("Failed to get assistantId from the server.");
        setVapiInstance(null);
      }
    } catch (error) {
      console.error("Failed to create or start assistant:", error);
      setVapiInstance(null);
    }
    setLoading(false);
  };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    console.log("Ending call..");
    vapiInstance.stop();

    setVapiInstance(null);
    const result = await generateReport();
    setCallStarted(false);
    toast.success("Your report has been genarated");
    router.replace("/dashboard");
  };

  const generateReport = async () => {
    const result = await axios.post("/api/generate-report", {
      messages: messages,
      sessionDetails: sessionDetails,
      sessionId: sessionId,
    });
    console.log(result.data);
    return result.data;
  };

  async function consumeCredit() {
    try {
      const response = await fetch("/api/user/credits", {
        method: "PATCH",
      });

      if (!response.ok) {
        // The server will return a specific error message in the JSON body
        const errorData = await response.json();
        console.error("Failed to update credits:", errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      const updatedUser = await response.json();
      console.log("Credits updated successfully!", updatedUser);
      // Now you can update your UI state with the new credit count
      // e.g., setUserCredits(updatedUser.credits);
    } catch (error) {
      console.error("A network error occurred:", error);
    }
  }

  return (
    <div className="h-[91vh] py-6">
      <div className="p-5 rounded-3xl border bg-gray-900">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl text-gray-400">00:00</h2>
          <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center text-white">
            <Circle
              className={`h-4 w-4 rounded-full ${
                callStarted ? `bg-green-500` : `bg-red-500`
              }`}
            />
            {callStarted ? "Connected" : "Not connected"}
          </h2>
        </div>
        {sessionDetails && (
          <div className="flex items-center justify-center mt-10 flex-col">
            <Image
              src={sessionDetails?.selectedDoctor?.image}
              alt={sessionDetails?.selectedDoctor?.specialist}
              width={120}
              height={120}
              className="h-[100px] w-[100px] object-cover rounded-full"
            />
            <h2 className="mt-2 text-lg text-white">
              {sessionDetails?.selectedDoctor?.specialist}
            </h2>
            <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

            <div className="mt-10 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72 h-[165px]">
              {messages?.slice(-3).map((msg, idx) => (
                <h2 className="text-gray-400 text-sm" key={idx}>
                  <span className="font-bold capitalize">{msg.role}</span>:{" "}
                  {msg.text}
                </h2>
              ))}
              {liveTranscripts && liveTranscripts?.length > 0 && (
                <h2 className="text-white text-sm">
                  <span className="font-bold capitalize">{currentRole}</span>:{" "}
                  {liveTranscripts}
                </h2>
              )}
            </div>
            {!callStarted ? (
              <Button
                onClick={startCall}
                className="mt-20 bg-blue-500 hover:border hover:border-white"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PhoneCallIcon />
                )}
                Start call
              </Button>
            ) : (
              <Button
                onClick={endCall}
                className="mt-20 bg-red-500 hover:border hover:border-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Generating Report
                  </>
                ) : (
                  <>
                    {" "}
                    <PhoneOff />
                    Disconnect
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
