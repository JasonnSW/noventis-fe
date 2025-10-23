import React from "react";

import { CodeBlock } from "@/components/code-block";
import { Divider } from "@/components/divider";
import { Section } from "@/components/section";
import { StepOptionCard } from "@/components/step-card";
import { dedent } from "@/lib/dedent";

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <h3 className="text-white text-4xl font-orbitron font-medium leading-normal">
          Contributing Guide for Noventis
        </h3>
        <p className="text-[#807F8C] font-normal font-openSans text-lg leading-normal">
          First off, thank you so much for your interest in contributing to
          Noventis! We're thrilled you're here. Every contribution, no matter
          how small, is greatly appreciated and helps us make this tool better
          for everyone.
        </p>
        <p className="text-[#807F8C] font-normal font-openSans text-lg leading-normal">
          This guide provides a set of guidelines and steps to make your
          contribution process as easy and effective as possible.
        </p>

        <Divider />

        <Section
          title="Code of Conduct"
          titleClass="mb-4"
          description={
            <p className="text-[#807F8C] font-openSans text-lg leading-normal">
              To maintain a friendly and inclusive community, this project and
              all its participants are governed by the{" "}
              <span className="text-[#FF6840] font-bold underline">
                Noventis Code of Conduct.
              </span>{" "}
              Please adhere to this code in all your interactions with the
              project.
            </p>
          }
        >
          <div className="mt-4">
            <CodeBlock title="BASH" code={codeOfConduct} />
          </div>
        </Section>

        <Divider />

        <Section
          title="How Can I Contribute?"
          titleClass="mb-2"
          description="There are many ways to contribute, and not all of them involve writing code."
        >
          <ul className="list-disc list-outside pl-6 space-y-1 text-[#B2B1BD] font-openSans text-base md:text-lg leading-normal mt-2 marker:text-[#FF6849]">
            <li className="text-[#807F8C]">
              <span className="font-bold text-[#FF6849]">Reporting Bugs: </span>
              If you find something that isn't working as expected, please open
              a new issue on our GitHub Issues page. Include steps to reproduce
              the bug.
            </li>
            <li className="text-[#807F8C]">
              <span className="font-bold text-[#FF6849]">
                Suggesting New Features:{" "}
              </span>
              Have a brilliant idea for a new functionality? We'd love to hear
              it! Open a new issue and describe your idea in detail.
            </li>
            <li className="text-[#807F8C]">
              <span className="font-bold text-[#FF6849]">
                Improving Documentation:{" "}
              </span>
              Found a typo or a confusing sentence in our docs? Fixes to
              documentation are just as important as fixes to code.
            </li>
            <li className="text-[#807F8C]">
              <span className="font-bold text-[#FF6849]">
                Submitting Pull Requests:{" "}
              </span>
              If you want to add a feature, fix a bug, or improve documentation,
              this is the best way to do it.
            </li>
          </ul>
        </Section>

        <Divider />

        <Section
          title="Your Contribution Workflow"
          titleClass="mb-4"
          description="Ready to start contributing? Follow these steps to set up your development environment and submit your first change."
        >
          <div className="mt-10 space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14">
            {contributionSteps.map((s) => {
              const hasCode = Boolean(s.code);
              return (
                <div
                  key={s.letter}
                  className={`grid grid-cols-1 ${
                    hasCode ? "lg:grid-cols-2" : "lg:grid-cols-1"
                  } gap-6 items-start`}
                >
                  <StepOptionCard
                    letter={s.letter}
                    title={s.title}
                    subtitle={s.subtitle}
                    details={s.details}
                  />

                  {hasCode && (
                    <div className="self-start">
                      <CodeBlock
                        title={s.language}
                        code={s.code!}
                        language={s.language}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <Divider />

        <Section
          title="Coding Standards"
          titleClass="my-2"
          description={
            <>
              <p className="text-[#807F8C] font-openSans text-lg leading-normal mb-3">
                To maintain code quality and consistency, please follow these
                standards:
              </p>

              <ul className="list-disc list-outside pl-5 space-y-2 text-[#807F8C] marker:text-[#FF6840]">
                <li>
                  <span className="text-[#FF6840] font-semibold">
                    Code Style:
                  </span>{" "}
                  We Use <code className="text-[#FF6840] font-bold">Black</code>{" "}
                  for automated code formatting. Please run black. before
                  committing to automatically format your code.
                </li>
                <li>
                  <span className="text-[#FF6840] font-semibold">
                    Docstrings:
                  </span>{" "}
                  All new public functions, classes, and methods must have a
                  clear docstring explaining their purpose, parameters, and what
                  they return.
                </li>
                <li>
                  <span className="text-[#FF6840] font-semibold">Testing:</span>{" "}
                  If you add new functionality, it's highly encouraged to add
                  corresponding unit tests. Contributions that include tests are
                  prioritized.
                </li>
              </ul>
            </>
          }
        />

        <Divider />

        <Section
          title="Pull Request Review Process"
          titleClass="my-2"
          description={
            <>
              <div className="text-[#807F8C] font-openSans text-lg leading-normal mb-1">
                Once you submit a PR, one of the project maintainers will review
                it. The process is as follows:
              </div>

              <ol className="list-decimal list-outside pl-5 space-y-2 text-[#807F8C] marker:text-[#FF6840]">
                <li>
                  <span className="text-[#FF6840] font-semibold">
                    Initial Review:
                  </span>{" "}
                  We will check if your PR is clear and aligns with the
                  project’s goals.
                </li>
                <li>
                  <span className="text-[#FF6840] font-semibold">
                    Feedback:
                  </span>{" "}
                  We may provide comments or request some changes to improve the
                  code quality.
                </li>
                <li>
                  <span className="text-[#FF6840] font-semibold">
                    Approval &amp; Merge:
                  </span>{" "}
                  Once all feedback is addressed and all automated checks (CI)
                  have passed, your PR will be merged into the main branch.
                </li>
              </ol>

              <div className="text-[#807F8C] font-openSans text-lg mt-2 leading-normal">
                Congratulations! Your contribution is now a part of Noventis
              </div>

              <div className="font-openSans text-lg font-bold mt-4 text-[#807F8C]">
                Once again, thank you for being a part of the Noventis
                community!
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}

interface ContributionStep {
  letter: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  language?: string;
  code?: string;
  details?: React.ReactNode;
}

const contributionSteps: ContributionStep[] = [
  {
    letter: "01",
    title: <>Step 1: Fork the Repository</>,
    subtitle: (
      <>
        Click the "Fork" button at the top-right corner of the{" "}
        <span className="text-[#FF6840] font-firaCode font-bold underline">
          Noventis GitHub page
        </span>{" "}
        to create a copy of the repository in your own GitHub account.
      </>
    ),
  },
  {
    letter: "02",
    title: <>Step 2: Clone Your Fork</>,
    subtitle: <>Now, clone your fork to your local machine.</>,
    language: "BASH",
    code: `git clone https://github.com/<YOUR-USERNAME>/noventis.git
cd noventis`,
  },
  {
    letter: "03",
    title: <>Step 3: Create a Virtual Environment</>,
    subtitle: (
      <>
        Always work inside a virtual environment to keep dependencies isolated.
      </>
    ),
    language: "BASH",
    code: `python -m venv venv
source venv/bin/activate  # macOS/Linux
# or .\\venv\\Scripts\\activate for Windows`,
  },

  {
    letter: "04",
    title: <>Step 4: Install Dependencies</>,
    subtitle: (
      <>
        Install the library in "editable" mode{" "}
        <span className="text-[#FF6849] font-firaCode">(-e)</span>. This means
        changes you make to the source code will take effect immediately without
        needing to reinstall.
      </>
    ),
    language: "BASH",
    code: `pip install -e .`,
  },
  {
    letter: "05",
    title: <>Step 5: Create a New Branch</>,
    subtitle: (
      <>Create a new branch to work on your changes. Use a descriptive name.</>
    ),
    details: (
      <>
        <ul className="list-disc list-outside pl-5">
          <li>
            For new features:{" "}
            <code className="text-[#FF6840] font-firaCode">
              feat/new-feature-name
            </code>
          </li>
          <li>
            For bug fixes:{" "}
            <code className="text-[#FF6840] font-firaCode">
              fix/short-bug-description
            </code>
          </li>
        </ul>
      </>
    ),
    language: "BASH",
    code: `git checkout -b feat/add-svm-model`,
  },

  {
    letter: "06",
    title: <>Step 6: Write Your Code!</>,
    subtitle: (
      <>
        Time to work your magic! Make your changes, add your features, or fix
        the bug. Be sure to follow our Coding Standards (see below).
      </>
    ),
  },
  {
    letter: "07",
    title: <>Step 7: Commit Your Changes</>,
    subtitle: (
      <>
        Use a clear and descriptive commit message. We recommend the{" "}
        <span className="font-bold">Conventional Commits</span> format.
      </>
    ),
    details: (
      <>
        <ul className="list-disc list-outside pl-5 text-[#807F8C] marker:text-[#FF6849]">
          <li>
            <code className="text-[#FF6840] font-firaCode">feat :</code> for a
            new feature.
          </li>
          <li>
            <code className="text-[#FF6840] font-firaCode">fix :</code> for a
            bug fix.
          </li>
          <li>
            <code className="text-[#FF6840] font-firaCode">docs :</code> for
            documentation changes.
          </li>
        </ul>
      </>
    ),
    language: "BASH",
    code: `git add .
git commit -m "feat: Add support for SVM model in ManualPredictor"`,
  },

  {
    letter: "08",
    title: <>Step 8: Push to Your Fork</>,
    subtitle: <>Upload your changes to your forked repository on GitHub.</>,
    language: "BASH",
    code: `git push origin feat/add-svm-model`,
  },
  {
    letter: "09",
    title: <>Submit a Pull Request (PR)</>,
    subtitle: (
      <>
        Open your forked repository on GitHub. You will see a button to create a
        Pull Request. Click it, provide a clear title and description for your
        PR, and then submit it.
      </>
    ),
  },
];

const codeOfConduct = dedent(`import pandas as pd
import numpy as np
from noventis_eda import NoventisAutoEDA
from noventis_datacleaner import data_cleaner
from noventis_automl import NoventisAutoML

# Create a "dirty" sample DataFrame
data = {
    'Age': [22, 38, 26, 35, np.nan, 28, 50, 45],
    'City': ['London', 'Paris', 'New York', 'Tokyo', 'London', 'Paris', np.nan, 'New York'],
    'Experience': [1, 10, 3, 8, 5, 4, 20, 15],
    'Salary': [72000, 48000, 54000, 250000, 75000, np.nan, 83000, 45000], # 250000 is an outlier
    'Purchased': [0, 1, 0, 1, 1, 0, 1, 0] # Our target
}
df = pd.DataFrame(data)

print("Initial Data:")
display(df)`);
