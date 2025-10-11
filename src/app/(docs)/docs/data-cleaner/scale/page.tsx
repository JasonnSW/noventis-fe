import React from "react";

import { CodeBlock } from "@/components/code-block";
import {
  DocsTable,
  DocsTableCell,
  DocsTableHead,
  DocsTableHeader,
  DocsTableRow,
} from "@/components/docs-table";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title?: string;
  description: string;
  code: string;
  language?: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Automatic Scaling",
    description:
      "Let NoventisScaler auto-pick the best scaler per column based on skewness and outliers. Great when your dataset mixes distributions.",
    code: `import pandas as pd
from noventis_scaler import NoventisScaler

# Sample data with different distributions
df = pd.DataFrame({
  'normal_data':  np.random.normal(100, 15, 1000),
  'skewed_data':  np.random.exponential(2, 1000),
  'with_outliers': np.concatenate([np.random.normal(50, 10, 950),
                                   np.random.normal(200, 10, 50)])
})

# initialize & fit/transform
scaler = NoventisScaler(method='auto')
df_scaled = scaler.fit_transform(df)

# see chosen methods per column
print(scaler.fitted_methods_)`,
    language: "PYTHON",
  },
  {
    number: "02",
    title: "Force Specific Method",
    description:
      "Force all columns to use a specific scaler (e.g., RobustScaler) when your dataset contains strong outliers across the board.",
    code: `import pandas as pd
from noventis_scaler import NoventisScaler

df = pd.DataFrame({
  'normal_data':  np.random.normal(100, 15, 1000),
  'skewed_data':  np.random.exponential(2, 1000),
  'with_outliers': np.concatenate([np.random.normal(50, 10, 950),
                                   np.random.normal(200, 10, 50)])
})

scaler = NoventisScaler(method='robust')
df_scaled = scaler.fit_transform(df)`,
    language: "PYTHON",
  },
];

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
          DATA_CLEANER
        </div>
        <h3 className="text-white text-4xl font-orbitron font-medium leading-normal">
          Scaling
        </h3>
        <p className="text-[#807F8C] font-normal font-openSans text-lg leading-normal">
          This Scaling module scales numerical features in your dataset. It's a
          powerful tool for handling common data issues like skewness and
          outliers, which can significantly improve the performance of many
          machine learning models.
        </p>
        <div className="py-3 self-stretch">
          <CodeBlock
            title="BASH"
            code="from noventis.data_cleaner import NoventisScaler"
          />
        </div>
        <div className="border-b border-[1px] border-[#0F2CAB] mt-4" />
        <h5 className="text-xl font-orbitron leading-normal mt-4 text-white">
          Parameters
        </h5>
        <DocsParameter />
        <div className="border-b border-[1px] border-[#0F2CAB] mt-4" />
        <h5 className="text-xl font-orbitron leading-normal mt-4 text-white">
          Model Usage Examples
        </h5>
        <div className="space-y-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center"
            >
              <div className="lg:col-span-1">
                <StepCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </div>
              <div className="lg:col-span-2 self-stretch">
                <CodeBlock
                  title={step.language}
                  code={step.code}
                  language={step.language}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "Method",
      type: "{'auto', 'standard', 'minmax', 'robust', 'power'}",
      default: <code>"auto"</code>,
      desc: (
        <div className="space-y-2">
          <p className="text-[#807F8C]">The scaling algorithm to be used.</p>

          <ul className="list-disc ml-5 space-y-2 leading-normal">
            <li>
              <b className="text-[#FF6849]">auto</b>{" "}
              <span className="text-[#807F8C]">
                (default): Automatically selects the best scaling strategy for
                each column based on its statistical properties (e.g., skewness,
                outliers).
              </span>
            </li>
            <li>
              <b className="text-[#FF6849]">standard</b>{" "}
              <span className="text-[#807F8C]">
                Uses <i>StandardScaler</i>. Best when data is already close to
                normal. Scales to mean 0 and std 1.
              </span>
            </li>
            <li>
              <b className="text-[#FF6849]">minmax</b>{" "}
              <span className="text-[#807F8C]">
                Uses <i>MinMaxScaler</i>. Scales to a fixed range (typically [0,
                1]). Good for models that expect bounded features (e.g., many
                neural nets).
              </span>
            </li>
            <li>
              <b className="text-[#FF6849]">robust</b>{" "}
              <span className="text-[#807F8C]">
                Uses <i>RobustScaler</i>. Resistant to outliers by using median
                and IQR. Suitable when outliers are present.
              </span>
            </li>
            <li>
              <b className="text-[#FF6849]">power</b>{" "}
              <span className="text-[#807F8C]">
                Uses <i>PowerTransformer</i>. Transforms skewed data to be
                closer to Gaussian, helping models that assume normality.
              </span>
            </li>
          </ul>
        </div>
      ),
      accent: true,
    },
    {
      name: "optimize",
      type: "bool",
      default: "True",
      desc: "If True, the scaler's internal parameters will be fine-tuned.",
    },
    {
      name: "custom_params",
      type: "Optional[dict]",
      default: "None",
      desc: "Allows you to override the default or optimized parameters for specific scaling methods.",
    },
    {
      name: "skew_threshold",
      type: "float",
      default: "2.0",
      desc: 'Threshold of absolute skewness to consider a column as "highly skewed".',
    },
    {
      name: "outlier_threshold",
      type: "float",
      default: "0.01",
      desc: 'Proportion of data points that must be outliers for a column to be categorized as "having outliers."',
    },
    {
      name: "normality_alpha",
      type: "float",
      default: "0.05",
      desc: "The significance level (alpha) used in the statistical test for normality.",
    },
    {
      name: "verbose",
      type: "bool",
      default: "True",
      desc: "If True, a summary of the scaling process will be printed after fitting.",
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        <DocsTable>
          <colgroup>
            <col className="w-52" />
            <col className="w-52" />
            <col className="w-52" />
            <col className="w-auto" />
          </colgroup>

          <DocsTableHead>
            <DocsTableRow>
              <DocsTableHeader>Parameter</DocsTableHeader>
              <DocsTableHeader>Type</DocsTableHeader>
              <DocsTableHeader>Default</DocsTableHeader>
              <DocsTableHeader>Description</DocsTableHeader>
            </DocsTableRow>
          </DocsTableHead>

          <tbody>
            {params.map((p) => (
              <DocsTableRow key={p.name}>
                <DocsTableCell className={cn("font-bold", "text-[#FF6849]")}>
                  {p.name}
                </DocsTableCell>

                <DocsTableCell
                  className={cn("whitespace-pre-wrap break-words")}
                >
                  {p.type}
                </DocsTableCell>

                <DocsTableCell
                  className={cn(p.name === "Method", "align-middle")}
                >
                  {p.default}
                </DocsTableCell>

                <DocsTableCell className="align-top text-[#807F8C]">
                  {p.desc}
                </DocsTableCell>
              </DocsTableRow>
            ))}
          </tbody>
        </DocsTable>
      </div>

      <div className="md:hidden space-y-3">
        {params.map((p) => (
          <div
            key={p.name}
            className="rounded-lg border border-[#0F2CAB] bg-[#050329] p-4"
          >
            <div
              className={cn(
                "text-sm font-semibold",
                p.accent ? "text-[#FF6849]" : "text-white"
              )}
            >
              {p.name}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
              <div className="opacity-70">Type</div>
              <div className="text-center">{p.type}</div>
              <div className="opacity-70">Default</div>
              <div className="mx-auto">{p.default}</div>
            </div>

            <div className="mt-3 text-sm text-gray-300">{p.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function StepCard({
  number,
  title,
  className,
}: {
  number: string;
  title?: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-start gap-4", className)}>
      <div className="relative w-20 h-24 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 grid place-items-center">
          <div className="p-[2px] rounded-md bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-[#050329] flex items-center justify-center">
              <span className="font-orbitron text-sm sm:text-base md:text-lg leading-none text-white">
                {number}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="-ml-1 text-left">
        <h4 className="font-orbitron text-sm sm:text-base md:text-lg text-center leading-tight text-white">
          {title}
        </h4>
      </div>
    </div>
  );
}

export function StepNumber({
  number,
  className,
}: {
  number: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-44 sm:w-48 h-28 sm:h-32 rounded-2xl grid place-items-center",
        className
      )}
    >
      <div className="p-[2px] rounded-md bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)]">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-[#050329] flex items-center justify-center">
          <span className="font-orbitron text-xl sm:text-2xl leading-none text-white">
            {number}
          </span>
        </div>
      </div>
    </div>
  );
}
