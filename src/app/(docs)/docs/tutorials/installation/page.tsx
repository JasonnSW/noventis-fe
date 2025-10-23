import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { Divider } from "@/components/divider";
import { cls, Section } from "@/components/section";

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <Header />

        <div className="py-2 self-stretch">
          <CodeBlock title="BASH" code="!pip install noventis" />
        </div>

        <Divider />

        <Section
          title="1. Prerequisites"
          description="Before installing, make sure your environment is ready:"
        >
          <Prerequisites />
        </Section>

        <Divider />

        <Section
          title="2. Installation Methods"
          description="Choose one of the methods below that best suits your needs."
          className="mt-2"
        >
          <InstallationMethod />
        </Section>

        <Divider />

        <Section
          title="3. Verify Installation"
          description="After the installation completes, verify that everything works:"
        >
          <VerifyInstallation />
        </Section>

        <Divider />

        <Section
          title="4. Next Steps"
          description="Congratulations, Noventis is installed! Start here:"
        >
          <NextSteps />
        </Section>
      </div>
    </section>
  );
}

function LetterBadge({ letter }: { letter: string }) {
  return (
    <div className="flex-none">
      <div className="rounded-md p-[2px] bg-[linear-gradient(270deg,#0F2CAB_0%,#FF6849_100%)] ring-1 ring-[#1e2fd1]/40 shadow-[0_0_0_1px_rgba(15,44,171,0.15)_inset]">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-[#050329] ring-white/5">
          <span className="font-orbitron text-white leading-none text-base md:text-xl">
            {letter}
          </span>
        </div>
      </div>
    </div>
  );
}

function StepOptionCard({
  letter,
  title,
  subtitle,
  details,
}: {
  letter: string;
  title: string;
  subtitle: string;
  details?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 lg:gap-5">
      <LetterBadge letter={letter} />
      <div className="text-left pt-0.5">
        <h5 className="font-orbitron text-white text-base md:text-lg lg:text-xl leading-normal">
          {title}
        </h5>
        <p className="mt-2 font-openSans text-justify text-[#807F8C] text-sm md:text-base lg:text-lg leading-normal">
          {subtitle}
        </p>
        {details && (
          <div className="mt-2 font-openSans text-base text-[#807F8C] text-justify md:text-lg leading-relaxed">
            {details}
          </div>
        )}
      </div>
    </div>
  );
}

const PREREQ_SNIPPET = `# Create a virtual environment
python -m venv noventis-env

# Activate (Windows)
.\\noventis-env\\Scripts\\activate

# Activate (macOS/Linux)
source noventis-env/bin/activate`;

const VERIFY_PIP = `pip show noventis`;

const VERIFY_PY = `try:
    import noventis
    # print(f"Noventis v{getattr(noventis, '__version__', '?')} installed successfully!")
    print("Noventis installation successful!")
except ImportError:
    print("Noventis installation failed or package not found.")`;

const NEXT_LINKS = [
  {
    href: "/docs/tutorials/quick-start",
    label: "Quickstart Guide",
    desc: "Run your first pipeline.",
  },
  {
    href: "/docs/eda_auto",
    label: "AutoEDA",
    desc: "Generate automated EDA reports.",
  },
  {
    href: "/docs/data-cleaner",
    label: "Data Cleaner",
    desc: "Configure the cleaning pipeline.",
  },
  {
    href: "/docs/predictor/auto_ml",
    label: "AutoML",
    desc: "Train & compare models automatically.",
  },
] as const;

type StepOption = {
  letter: "A" | "B" | "C";
  title: string;
  subtitle: string;
  details?: React.ReactNode;
  code: string;
  language?: string;
};

const installSteps: StepOption[] = [
  {
    letter: "A",
    title: "Option A: Standard Installation (Most Common)",
    subtitle:
      "This is the easiest way and will install the latest stable version of Noventis.",
    details: (
      <span className="text-[#807F8C] font-openSans">
        <span className="text-[#FF6849]">pip</span> will automatically handle
        and install all required dependencies such as{" "}
        <span className="text-[#FF6849]">
          pandas, scikit-learn, flaml, optuna,
        </span>{" "}
        etc.
      </span>
    ),
    code: `pip install noventis`,
    language: "BASH",
  },
  {
    letter: "B",
    title: "Option B: Install a Specific Version",
    subtitle:
      "If you require a specific version of the library, use the following command:",
    details: (
      <span>
        (Replace <span className="text-[#FF6849] font-semibold">1.2.3</span>{" "}
        with your desired version number).
      </span>
    ),
    code: `pip install noventis==1.2.3`,
    language: "BASH",
  },
  {
    letter: "C",
    title: "Option C: Install for Developers (from Source)",
    subtitle:
      "This method is perfect for those who want the latest, unreleased features or wish to contribute to the project's development. We welcome all contributions! To get started, please review our Contribution Guide for guidelines and best practices. You can find the source code at our official GitHub repository.",
    details: (
      <span>
        The <span className="text-[#FF6849] ">-e</span> or "editable" mode
        allows you to modify the source code, and your changes will take effect
        immediately without needing to reinstall.
      </span>
    ),
    code: `# 1. Clone the repository
git clone https://github.com/your-name/noventis.git

# 2. Navigate into the directory
cd noventis

# 3. Install in "editable" mode
pip install -e .`,
    language: "BASH",
  },
];

function Header() {
  return (
    <>
      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal">
        Noventis Installation Guide
      </h3>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg leading-normal text-justify my-2">
        Welcome! Follow the steps below to install the{" "}
        <span className="text-[#FF6849] font-firaCode">Noventis</span> library
        and start automatically cleaning and modeling your data.
      </p>
    </>
  );
}

function Prerequisites() {
  return (
    <>
      <ul className={cls.ul}>
        <li className="text-[#807F8C] marker:text-[#807F8C]">
          <span className="font-bold">Python:</span>{" "}
          <span className="text-[#FF6849]">3.8+</span>
        </li>
        <li className="text-[#807F8C] marker:text-[#807F8C]">
          <span className="font-bold">Package Manager:</span>{" "}
          <span className="text-[#FF6849]">pip</span>
        </li>
        <li className="text-[#807F8C] marker:text-[#807F8C]">
          <span className="font-bold">
            (Highly Recommended) Virtual Environment:
          </span>{" "}
          use a venv to avoid conflicts.
        </li>
      </ul>
      <div className="mt-4">
        <CodeBlock title="BASH" code={PREREQ_SNIPPET} />
      </div>
    </>
  );
}

function InstallationMethod() {
  return (
    <div className="mt-8 space-y-14">
      {installSteps.map((s, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start"
        >
          <StepOptionCard
            letter={s.letter}
            title={s.title}
            subtitle={s.subtitle}
            details={s.details}
          />

          <div className="self-start text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
            <CodeBlock title={s.language} code={s.code} language={s.language} />
          </div>
        </div>
      ))}
    </div>
  );
}

function VerifyInstallation() {
  return (
    <>
      <div className="py-3 self-stretch text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
        <CodeBlock title="BASH" code={VERIFY_PIP} />
      </div>

      <p className={cls.p}>
        The command above shows package details including version.
      </p>

      <p className={cls.p}>
        <span className="font-bold">Check via Python: </span>
        Open a Python interpreter and run this short script to ensure the
        library can be imported.
      </p>

      <div className="py-3 self-stretch text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
        <CodeBlock title="PYTHON" code={VERIFY_PY} />
      </div>
    </>
  );
}

function NextSteps() {
  return (
    <>
      <ul className="list-disc list-outside text-sm md:text-base lg:text-lg pl-6 mt-2 space-y-2 text-[#807F8C] font-openSans leading-normal marker:text-[#FF6849]">
        {NEXT_LINKS.map((l, i) => (
          <li key={i}>
            <Link
              href={l.href}
              className="text-[#FF6849] hover:text-[#ff896b] underline underline-offset-2"
            >
              {l.label}
            </Link>
            : {l.desc}
          </li>
        ))}
      </ul>
    </>
  );
}
