"use client";

import Marquee from "@/components/marquee";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex w-full min-h-screen items-center justify-center bg-[#07043E] overflow-hidden">
      <div
        className="absolute left-[180px] top-[-104px] w-[360px] h-[360px] aspect-square
             rounded-[360px] opacity-20 bg-[#ff6849] blur-[150px]"
      />
      <div className="relative flex-col items-center justify-center text-center z-10 px-12 text-white max-w-3xl -translate-y-1/10 sm:-translate-y-1/6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-orbitron text-shadow-noventis">
          <span className="text-[#FF6849]">Noventis: </span>
          Intelligent Automation for Your Data Analysis.
        </h1>
        <h5 className="mt-4 font-orbitron text-lg sm:text-xl text-[#807f8c] max-w-md text-center mx-auto">
          Free Data Scientists from Repetitive Tasks, Focus on Valuable
          Insights.
        </h5>

        <Link href="/docs/tutorials/installation">
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
        </Link>

        <div
          className="absolute -right-[150px] -bottom-[10px] w-[240px] h-[240px] aspect-square
             rounded-full opacity-50 bg-[#0F2CAB] blur-[150px] z-0"
        />
      </div>

      <motion.div
        className="absolute bottom right-[-50px] md:w-[340px] lg:w-[480px] h-full max-w-none hidden md:block"
        initial="off"
        animate="off"
        whileHover="on"
      >
        <Image
          src="/hero-laptop.svg"
          alt="hero-laptop"
          fill
          className=" hidden md:block"
        />
        <motion.img
          src="/hero-laptop-beam.svg"
          alt=""
          className="absolute inset-0 w-full h-full  hidden md:block"
          variants={{ off: { opacity: 0 }, on: { opacity: 1 } }}
          transition={{ duration: 0.4, ease: [0.5, 1, 0.36, 1] }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-15 left-[-10px] w-[400px] lg:w-[480px] h-full max-w-none hidden md:block"
        initial="off"
        animate="off"
        whileHover="on"
      >
        <Image
          src="/hero-shape-hover.svg"
          alt="hero-shape"
          fill
          className="object-contain hidden md:block"
        />
        <div
          className="
      absolute -bottom-96 left-[100px] lg:w-[400px] rotate-90
      w-[100%] h-[100%] rounded-full
      bg-[#FF6849] opacity-20
      blur-[70px] sm:blur-[110px] lg:blur-[250px]
    "
        />
      </motion.div>

      <Marquee
        speed={20}
        direction="right"
        className="absolute bottom-5 opacity-30 z-[1] -rotate-[2deg] pointer-events-none"
      />

      <Marquee
        speed={20}
        direction="left"
        className="absolute bottom-3 z-[1] rotate-[1.5deg] pointer-events-none"
      />
    </section>
  );
}
