import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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
    title: "Quick Installation Guide",
    description:
      "Ensure you have Python 3.8 or newer installed. Noventis is published on PyPI, allowing for a simple and straightforward installation using pip.",
    code: "pip install noventis",
    language: "BASH",
  },
  {
    number: "02",
    title: "Verify Installation",
    description:
      "Once the installation is complete, you can verify that Noventis was installed correctly by importing it in Python and checking its version.",
    code: `import noventis\nprint(noventis.__version__)`,
    language: "PYTHON",
  },
  {
    number: "03",
    title: "Virtual Environment Guide",
    description:
      "We highly recommend installing Noventis inside a virtual environment to keep your project dependencies isolated and clean. Here is a quick guide to create one using venv.",
    code: `python -m venv noventis_env\nsource noventis_env/bin/activate  # Linux/macOS\n# noventis_env\\Scripts\\activate   # Windows\nsource noventis_env/bin/activate  # Linux/macOS\npip install noventis`,
    language: "BASH",
  },
];

export default function InstallationSection() {
  return (
    <section className="relative overflow-hidden w-full bg-[#04021F] py-14">
      <div className="flex-col items-center justify-center self-stretch gap-12">
        <div className="mx-auto text-center">
          <svg
            viewBox="0 0 464 10"
            className="mx-auto h-[10px] w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M1 1L232 9L463 1"
              stroke="url(#paint0_linear_128_383)"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_128_383"
                x1="463.452"
                y1="2"
                x2="0.547945"
                y2="2"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6849" />
                <stop offset="0.5" stopColor="#874A7A" stopOpacity="0.05" />
                <stop offset="1" stopColor="#0F2CAB" />
              </linearGradient>
            </defs>
          </svg>

          <h3 className="mt-2 text-noventis-color font-orbitron font-medium leading-normal text-4xl">
            Quick Installation Guide
          </h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full"
            >
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
              <div className="self-start">
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

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title?: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 lg:gap-6">
      <div className="relative w-48 h-32 rounded-2xl overflow-hidden ring-1 ring-[#2138c1]">
        <div
          className="absolute inset-0 opacity-40
           bg-[repeating-linear-gradient(-75deg,rgba(47,73,220,0.35)_0px,rgba(47,73,220,0.35)_2px,transparent_2px,transparent_18px)]"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="p-[2px] rounded-md bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-[#050329] flex items-center justify-center">
              <span className="font-orbitron text-xl sm:text-2xl leading-none text-white">
                {number}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-left -ml-1">
        <h4 className="font-orbitron text-lg md:text-2xl leading-tight text-white">
          {title}
        </h4>
        <p className="mt-2 font-openSans text-[#807f8c] leading-normal max-w-sm text-sm md:text-base text-justify">
          {description}
        </p>
      </div>
    </div>
  );
}

function CodeBlock({
  title,
  code,
  language,
}: {
  title?: string;
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied successfully!");
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative rounded-2xl bg-[#0d0f4a] border border-[#120D6A] p-3">
      <div className="flex items-center justify-center relative px-2">
        <span className="tracking-[0.2em] text-[#a9acbf]">{title}</span>
        <button
          onClick={onCopy}
          className="absolute right-2 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-white hover:text-[#ff6849] cursor-pointer"
          aria-label="Copy"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="mt-3 rounded-lg overflow-hidden border border-[#0f2cab] bg-[#120D6A]">
        <SyntaxHighlighter
          language={language?.toLowerCase()}
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
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
