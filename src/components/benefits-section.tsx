import React from "react";
import { Card } from "@/components/ui/card";
import { HiBolt } from "react-icons/hi2";
import {
  MdOutlineTimeline,
  MdOutlineCompress,
  MdHotelClass,
} from "react-icons/md";
import { GiArrowCursor } from "react-icons/gi";

type Benefit = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

const benefits: Benefit[] = [
  { title: "Gain Faster\nInsights", icon: HiBolt },
  { title: "Accelerate\nWorkflows", icon: MdOutlineTimeline },
  { title: "Effortless\nUsability", icon: GiArrowCursor },
  { title: "Reduce Boilerplate\nCode", icon: MdOutlineCompress },
  { title: "Focus on\nHigh-Value Work", icon: MdHotelClass },
];

export default function BenefitsSection() {
  return (
    <section className="relative w-full bg-[#04021F] overflow-hidden">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-12 py-14">
        <div className="max-w-xl mx-auto text-center">
          <svg
            viewBox="0 0 514 10"
            className="mx-auto h-[10px] w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L257 9L513 1"
              stroke="url(#paint0_linear_128_380)"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_128_380"
                x1="513.501"
                y1="2"
                x2="0.499022"
                y2="2"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6849" />
                <stop offset="0.5" stopColor="#874A7A" stopOpacity="0.05" />
                <stop offset="1" stopColor="#0F2CAB" />
              </linearGradient>
            </defs>
          </svg>

          <h3 className="text-noventis-color font-orbitron text-4xl font-medium leading-normal mt-2">
            How Noventis Empowers Your Workflow
          </h3>
        </div>

        <div
          className={[
            "mt-11 grid gap-10 max-w-7xl mx-auto",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
            "lg:[&>*]:col-span-2",
            "lg:[&>*:nth-last-child(2)]:col-start-2",
          ].join(" ")}
        >
          {benefits.map((b, i) => (
            <BenefitCard key={i} title={b.title} Icon={b.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  title,
  Icon,
}: {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card
      className={[
        "bg-[#050329] rounded-8px border-t-2 border-l-1 border-r-1 border-[#0F2CAB] border-b-0",
        "p-8 flex flex-col items-center text-center gap-5",
        "shadow-lg transition",
        "hover:shadow-[0_0_0_2px_rgba(15,44,171,0.6)] hover:border-t-[#1a36d6] hover:border-l-[#1a36d6] hover:border-r-[#1a36d6]",
      ].join(" ")}
    >
      <div className="p-[2px] rounded-lg bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)]">
        <div className="flex items-center justify-center size-18 rounded-lg bg-[#050329]">
          <Icon className="size-9 text-white" />
        </div>
      </div>

      <h5 className="whitespace-pre-line font-orbitron text-white text-lg leading-mormal">
        {title}
      </h5>
    </Card>
  );
}
