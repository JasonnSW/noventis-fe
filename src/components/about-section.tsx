import React from "react";
import { Card } from "./ui/card";
import { MdOnlinePrediction } from "react-icons/md";
import { FiGitBranch } from "react-icons/fi";
import { GiVacuumCleaner } from "react-icons/gi";

type Module = {
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const modules: Module[] = [
  {
    title: "Data_cleaner",
    headline: "Automated Data Cleaning & Preprocessing",
    description:
      "Handle missing values, detect outliers, and preprocess features automatically. Every step is complete with quality reports and before-and-after comparison visualizations, so you always maintain full control over your data.",
    icon: GiVacuumCleaner,
  },
  {
    title: "Eda_auto",
    headline: "Automated Data Exploration & Smart Visualizations",
    description:
      "Generate of statistical visualizations—from distributions to correlations—with a single line of code. Gain a deep understanding of your dataset in seconds, not hours, without needing to write plotting code one by one.",
    icon: FiGitBranch,
  },
  {
    title: "Predictor",
    headline: "Rapid ML Model Building & Evaluation",
    description:
      "Train and evaluate multiple machine learning models at once with an AutoML approach, or select your specific algorithms. Get a baseline model for your project instantly, allowing you to move on to the tuning phase faster.",
    icon: MdOnlinePrediction,
  },
];

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#04021F] overflow-hidden">
      <div className="flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-12 text-white text-center mt-20">
        <div className="flex-col items-center justify-center self-stretch gap-12">
          <div className="mx-auto text-center">
            <svg
              className="mx-auto h-[10px] w-auto"
              viewBox="0 0 366 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 9L183 1L365.5 9"
                stroke="url(#paint0_linear_188_536)"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_188_536"
                  x1="365.857"
                  y1="8"
                  x2="0.142857"
                  y2="8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6849" />
                  <stop offset="0.5" stopColor="#874A7A" stopOpacity="0.05" />
                  <stop offset="1" stopColor="#0F2CAB" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h3 className="text-noventis-color font-orbitron font-medium leading-normal text-4xl">
            What Is Noventis?
          </h3>
          <svg
            className="mx-auto h-[10px] w-auto"
            viewBox="0 0 366 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M365.5 1L183 9L0.5 1"
              stroke="url(#paint0_linear_220_495)"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_220_495"
                x1="0.142857"
                y1="2"
                x2="365.857"
                y2="2"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6849" />
                <stop offset="0.5" stopColor="#874A7A" stopOpacity="0.05" />
                <stop offset="1" stopColor="#0F2CAB" />
              </linearGradient>
            </defs>
          </svg>
          <p className="max-w-4xl mx-auto w-full text-white leading-normal font-openSans mt-6 text-lg font-normal">
            Noventis was born from a single belief: a data practitioner's time
            is too valuable to be spent on repetitive tasks. That's why we
            created this intelligent Python toolkit to take over tedious jobs
            like initial data cleaning and exploratory analysis. The goal is
            simple—to free you up to focus directly on high-value work like deep
            analysis, complex modeling, and strategic decision-making.
          </p>
          <div className="mt-11">
            <h4 className="text-white font-orbitron leading-normal text-center text-[28px]">
              Key Modules
            </h4>
            <ModuleCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ModuleCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-7 gap-6 max-w-7xl mx-auto">
      {modules.map((mod, idx) => (
        <Card
          key={idx}
          className="h-full bg-[#050329] border border-[#0F2CAB] rounded-2xl p-6
                     flex flex-col items-center text-center gap-4
                     shadow-[0_0_0_1px_rgba(15,44,171,0.25)] hover:shadow-[0_0_0_2px_rgba(15,44,171,0.6)] hover:border-[#1a36d6]"
        >
          <div className="relative w-14 h-14 flex items-center justify-center rounded-[10px] border-[2.5px] border-[#FF6849] bg-[linear-gradient(270deg,rgba(15,44,171,0.30)_0%,rgba(255,104,73,0.30)_100%)]">
            <mod.icon className="size-8 text-white" />
          </div>

          <div className="mt-2 min-h-[92px] sm:min-h-[84px] flex flex-col justify-start">
            <div className="text-[#FF6849] font-orbitron text-lg font-bold">
              {mod.title}
            </div>

            <h4 className="mt-2 text-white font-openSans text-lg font-bold leading-snug">
              {mod.headline}
            </h4>
          </div>

          <p className="mt-auto text-[#807F8C] font-openSans text-sm text-justify leading-7 max-w-md">
            {mod.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
