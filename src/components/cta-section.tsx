import React from "react";
import { MdTerminal } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { dedent } from "@/lib/dedent";
import Link from "next/link";
import { CodeBlock } from "./code-block";

export default function CtaSection() {
  return (
    <section className="relative w-full bg-[#04021F] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-4">
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

        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <CodeBlock
            title="QUICK EXAMPLE"
            titleIcon={<MdTerminal />}
            language="python"
            code={quickExample}
          />
          <div className="flex flex-col space-y-4">
            <CodeBlock
              title="BEFORE"
              titleIcon={<IoPlayCircleOutline />}
              imageSrc="/before.svg"
            />

            <CodeBlock
              title="AFTER"
              titleIcon={<IoPlayCircleOutline />}
              imageSrc="/after.svg"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="btn-gradient-border font-openSans">
            <span className="btn-inner px-8 py-3 text-white font-openSans cursor-pointer">
              <Link href="/docs/tutorials/quick-start">
                <span className="btn-label font-openSans font-semibold">
                  See More Examples
                </span>
              </Link>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

const quickExample = dedent(`# 1. Start with messy data (with NaNs and text)
import pandas as pd
import numpy as np
df = pd.DataFrame({
    'City': ['London', np.nan, 'Paris', 'Tokyo'],
    'Salary': [72000, np.nan, 250000, 89000],
    'Purchased': [0, 1, 0, 1]
})

# 2. Clean it in ONE LINE with Noventis!
from noventis_datacleaner import data_cleaner
cleaned_df = data_cleaner(df, target_column='Purchased')

# 3. Your data is now model-ready
print(cleaned_df.head())





`);
