"use client";
import Image from "next/image";
import { DoctorAgent } from "./DoctorCard";

type Props = {
  doctorAgent: DoctorAgent;
  setSelectedDoctor: any;
  selectedDoctor: DoctorAgent;
};

export const SuggestedDoctorCard = ({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl p-5 shadow hover:border-blue-500 cursor-pointer ${
        selectedDoctor?.id == doctorAgent?.id && `border-blue-500`
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent?.image}
        alt={doctorAgent?.specialist}
        width={70}
        height={70}
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <h2 className="font-bold text-sm text-center mt-1">
        {doctorAgent?.specialist}
      </h2>
      <p className="text-xs text-center line-clamp-2">
        {doctorAgent?.description}
      </p>
    </div>
  );
};
