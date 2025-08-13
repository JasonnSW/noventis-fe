"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Image as ImageIcon } from "lucide-react";
import { MdTerminal } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";

const quickExample = `python -m venv noventis_env
source noventis_env/bin/activate   # Linux/macOS
# noventis_env\\Scripts\\activate   # Windows
source noventis_env/bin/activate   # Linux/macOS
pip install noventis`;

export default function CtaSection() {
  return (
    <section className="relative w-full bg-[#04021F] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex flex-col items-center">
            <svg
              width="474"
              height="10"
              viewBox="0 0 474 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L237 9L473 1"
                stroke="url(#paint0_linear_178_579)"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_178_579"
                  x1="473.462"
                  y1="2"
                  x2="0.53816"
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
            Get Started in Seconds!
          </h3>
        </div>

        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-8xl mx-auto">
          <div className="relative rounded-2xl bg-[#0B0848] border border-[#120D6A] p-4">
            <div className="flex items-center justify-center px-2 gap-x-2">
              <MdTerminal className="w-6 h-6 text-[#FF6849]" />
              <span className="tracking-[0.2em] text-[#a9acbf] text-xs sm:text-sm font-openSans">
                QUICK EXAMPLE
              </span>
            </div>

            <div className="mt-3 rounded-xl overflow-hidden border border-[#0f2cab] bg-[#120D6A]">
              <SyntaxHighlighter
                language="bash"
                style={atomOneDark}
                PreTag="div"
                customStyle={{
                  background: "transparent",
                  paddingInline: 20,
                  fontSize: "1.125rem",
                  fontFamily: "var(--font-fira-code), monospace",
                  margin: 0,
                }}
                wrapLongLines
              >
                {quickExample}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="relative rounded-2xl bg-[#0b0848] border border-[#120D6A] p-4">
            <div className="flex items-center justify-center px-2 gap-x-2">
              <IoPlayCircleOutline className="w-6 h-6 text-[#FF6849]" />
              <span className="tracking-[0.2em] text-[#a9acbf] text-xs sm:text-sm font-openSans">
                RESULTS
              </span>
            </div>
            <div className="mt-3 rounded-xl border border-[#0f2cab] bg-[#120D6A] p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-[#807f8c]">
                <ImageIcon className="w-10 h-10" />
                <p className="text-center text-sm sm:text-lg max-w-xl">
                  insert of the visual output from the code (e.g., a summary
                  table or a simple plot).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="btn-gradient-border font-openSans">
            <span className="btn-inner px-8 py-3 text-white font-openSans cursor-pointer">
              <span className="btn-label font-openSans font-semibold">
                See More Examples
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
