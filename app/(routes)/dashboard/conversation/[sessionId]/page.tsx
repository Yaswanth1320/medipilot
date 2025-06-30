"use client";
import { DoctorAgent } from "@/components/pages/DoctorCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCallIcon, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

type SessionType = {
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
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscripts, setLiveTranscripts] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);

  useEffect(() => {
    sessionId && getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get("/api/sessionchat?sessionId=" + sessionId);
    console.log(result?.data);
    setSessionDetails(result?.data);
  };

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with your health concerns.",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: sessionDetails?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetails?.selectedDoctor.agentPrompt,
          },
        ],
      },
    };
    //@ts-ignore
    // vapi.start(VapiAgentConfig);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcript, transcriptType } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == "partial") {
          setLiveTranscripts(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscripts("");
          setCurrentRole(null);
        }
      }
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRole("Assistant");
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stoped speaking");
      setCurrentRole("user");
    });
  };

  const endCall = () => {
    if (!vapiInstance) return;
    console.log("Ending call..");
    vapiInstance.stop();
    //@ts-ignore
    vapiInstance.off("call-start");
    vapiInstance.off("call-end");
    vapiInstance.off("message");

    setCallStarted(false);
    setVapiInstance(null);
  };

  return (
    <div className="h-screen py-10">
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

            <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
              {messages?.slice(-3).map((msg: messages, idx) => (
                <h2 className="text-gray-400 text-sm" key={idx}>
                  {msg.role} : {msg.text}
                </h2>
              ))}
              {liveTranscripts && liveTranscripts?.length > 0 && (
                <h2 className="text-white text-sm">
                  {currentRole}:{liveTranscripts}
                </h2>
              )}
            </div>
            {!callStarted ? (
              <Button
                onClick={() => startCall()}
                className="mt-20 bg-blue-500 hover:border hover:border-white"
              >
                <PhoneCallIcon /> Start call
              </Button>
            ) : (
              <Button
                onClick={() => endCall()}
                className="mt-20 bg-red-500 hover:border hover:border-white"
              >
                <PhoneOff /> Disconnect
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
