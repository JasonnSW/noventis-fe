import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MdInsertComment, MdAssignment } from "react-icons/md";

type FeatureCardProps = {
  icon?: React.ReactNode;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
};

const features: FeatureCardProps[] = [
  {
    icon: <MdInsertComment className="h-8 w-8 text-white" />,
    slug: "nlq",
    title: "Natural Language Query",
    subtitle: "Interact with Your Data Using Everyday Language",
    description:
      "Ask questions in plain English, get instant answers. Our upcoming NLQ module, powered by advanced generative AI, will allow you to query your DataFrame and generate visualizations just by having a conversation.",
  },
  {
    icon: <MdAssignment className="h-8 w-8 text-white" />,
    slug: "report_gen",
    title: "Report Generator",
    subtitle: "Automated Comprehensive Project Reporting",
    description:
      "Go from a clean DataFrame to a professional, presentation-ready PDF report automatically. This module will summarize the entire data cleaning and analysis workflow, including key statistics and visualizations, into a shareable document.",
  },
];

export default function ComingSoonSection() {
  return (
    <section className="relative w-full bg-[#04021F] overflow-hidden py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex flex-col items-center">
            <svg
              width="530"
              height="10"
              viewBox="0 0 530 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L265 9L529 1"
                stroke="url(#paint0_linear_220_523)"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_220_523"
                  x1="529.517"
                  y1="2"
                  x2="0.483366"
                  y2="2"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6849" />
                  <stop offset="0.5" stopColor="#874A7A" stopOpacity="0.05" />
                  <stop offset="1" stopColor="#0F2CAB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="text-noventis-color font-orbitron text-4xl font-medium leading-normal mt-2">
            What's Next for Noventis?
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-14">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  slug,
  title,
  subtitle,
  description,
  status = "Coming Soon",
}: FeatureCardProps) {
  return (
    <Card className="relative border-[#0F2CAB] border-2 bg-[#050329] shadow-[0_0_0_1px_rgba(15,44,171,0.25)]">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="icon-gradient-border">
            <div className="icon-inner w-6 h-6 md:h-14 md:w-14 flex items-center justify-center">
              {icon ?? <MdAssignment className="h-6 w-6 text-white" />}
            </div>
          </div>
          <div className="max-w-sm">
            <div className="font-orbitron font-bold text-base md:text-xl leading-none text-[#FF6849]">
              {slug}
            </div>
            <CardTitle className="mt-1 font-openSans text-sm md:text-[15px] font-bold text-white leading-normal">
              {title}
            </CardTitle>
          </div>
        </div>

        <div className="btn-gradient-border">
          <span className="btn-inner px-5 py-2 text-[12px] text-white/90">
            {status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="max-w-lg">
        <p className="text-lg font-openSans text-white/90">{subtitle}</p>
        <CardDescription className="mt-3 font-normal font-openSans text-base leading-normal text-[#A9ACBF] text-justify">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
