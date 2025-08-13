"use client";

import Marquee from "@/components/marquee";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex w-full h-screen items-center justify-center bg-[#07043E] overflow-hidden">
      <div
        className="absolute left-[180px] top-[-104px] w-[360px] h-[360px] aspect-square
             rounded-[360px] opacity-20 bg-[#ff6849] blur-[150px]"
      />
      <div className="relative flex-col items-center justify-center text-center z-10 px-12 text-white max-w-3xl -translate-y-1/6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight font-orbitron text-shadow-noventis">
          <span className="text-[#FF6849]">Noventis: </span>
          Intelligent Automation for Your Data Analysis.
        </h1>
        <h5 className="mt-4 font-orbitron text-xl text-[#807f8c] max-w-md text-center mx-auto">
          Free Data Scientists from Repetitive Tasks, Focus on Valuable
          Insights.
        </h5>
        <Button
          variant="default"
          className="border-3 border-[#FF6860] hover:border-[#FF6849] group relative mt-6 inline-flex h-12 items-center justify-center
             rounded-full bg-[#FF6849] hover:bg-[#FF6844] px-8 text-white cursor-pointer font-semibold font-open-sans text-lg
             transition-all duration-300 gap-4"
        >
          <span className="flex items-center">Install Noventis</span>

          <span className="flex items-center">
            <span className="block rounded-full h-[1px] w-0 bg-[#d9d9d9] transition-all duration-300 group-hover:w-3 -mr-1 group-hover:text-white" />
            <SlArrowRight className="text-[#d9d9d9] -ml-[5px] group-hover:text-white" />
          </span>
        </Button>
        <div
          className="absolute -right-[120px] -bottom-[10px] w-[240px] h-[240px] aspect-square
             rounded-full opacity-80 bg-[#ff6849] blur-[150px] z-0"
        />
      </div>

      <motion.div
        className="absolute -bottom-0 right-[-40px] w-[480px] h-full max-w-none hidden md:block"
        initial="off"
        animate="off"
        whileHover="on"
      >
        <Image
          src="/hero-laptop.svg"
          alt=""
          fill
          className="object-contain hidden md:block"
        />
        <motion.img
          src="/hero-laptop-beam.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-contain hidden md:block"
          variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
          transition={{ duration: 0.4, ease: [0.5, 1, 0.36, 1] }}
        />
      </motion.div>

      <Marquee
        speed={20}
        direction="right"
        className="absolute bottom-8 opacity-30 z-[1] -rotate-[2deg] pointer-events-none"
      />

      <Marquee
        speed={20}
        direction="left"
        className="absolute bottom-5 z-[1] pointer-events-none"
      />
    </section>
  );
}
