import React from "react";

import { CodeBlock } from "@/components/code-block";
import {
  DocsTable,
  DocsTableCell,
  DocsTableHead,
  DocsTableHeader,
  DocsTableRow,
} from "@/components/docs-table";
import { Divider } from "@/components/divider";
import { Section } from "@/components/section";
import { dedent } from "@/lib/dedent";
import { StepOptionCard } from "@/components/step-card";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-1">
        <Header />

        <Section title="Import">
          <ImportNoventisDataCleaner />
        </Section>

        <Divider />

        <Section title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section titleClass="mb-2" title="Methods">
          <MethodsNoventisDataCleaner />
        </Section>

        <Divider />

        <Section
          titleClass="font-medium font-orbitron text-2xl md:text-3xl lg:text-4xl mt-4"
          title="data_cleaner (The Simplified Helper Function)"
        >
          <DataCleanerIntro />
        </Section>

        <Divider />

        <Section title="Parameters" titleClass="mb-4">
          <DocsParameterDataCleaner />
        </Section>

        <Divider />

        <Section title="Model Usage Examples" titleClass="mb-4">
          <ModelUsageExamples />
        </Section>
      </div>
    </main>
  );
}

const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Using the NoventisDataCleaner Class for Full Control</>,
    subtitle: (
      <>
        This example shows how to build a custom pipeline with specific
        parameters for each step.
      </>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "BASH",
            code: dedent(`import pandas as pd
from noventis.datacleaner import NoventisDataCleaner

# Assume ‘dummy_classification_churn’ is in your folder
df = pd.read_csv('dummy_classification_churn.csv')

X = df.drop(columns=['churn'])
y = df['churn']

# 1. Define custom configurations for each step
imputer_config = {'method': 'median'}
outlier_config = {'default_method': 'winsorize', 'quantile_range': (0.01, 0.99)}
encoder_config = {'method': 'auto', 'target_column': ‘churn'}
scaler_config = {'method': 'robust'}

# 2. Initialize the cleaner with the custom configurations
cleaner = NoventisDataCleaner(
    pipeline_steps=['impute', 'outlier', 'encode', 'scale'],
    imputer_params=imputer_config,
    outlier_params=outlier_config,
    encoder_params=encoder_config,
    scaler_params=scaler_config,
    verbose=False
)

# 3. Run the entire pipeline
cleaned_df = cleaner.fit_transform(X, y)

# 4. Generate the interactive HTML report
cleaner.generate_html_report()

`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-data-cleaner-01.svg",
            imageAlt: "noventisd-data-cleaner-01",
          },
        ],
      },
    ],
  },
  {
    letter: "02",
    title: <>Example 2: Using the Function and Getting the Report</>,
    subtitle: (
      <>
        This shows how to use the simple function but still get the full{" "}
        <code className="font-firaCode text-[#FF6849]">
          NoventisDataCleaner
        </code>{" "}
        instance back to generate the detailed HTML report.
      </>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "BASH",
            code: dedent(`from noventis import data_cleaner

# Assume ‘dummy_classification_churn’ is in your folder
df_2 = pd.read_csv('../dataset_for_examples/AmesHousing.csv')

# Run the cleaner and ask for the instance to be returned
df_cleaned, dfisinstance = data_cleaner(
    data=df_2,
    return_instance=True,
    target_column='SalePrice'
)

# Now, generate the rich HTML report from the returned instance
dfisinstance.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-data-cleaner-02.svg",
            imageAlt: "noventisd-data-cleaner-02",
          },
        ],
      },
    ],
  },
];

function Header() {
  return (
    <>
      <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
        DATA_CLEANER
      </div>

      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal">
        NoventisDataCleaner (The Pipeline Orchestrator)
      </h3>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg leading-normal text-justify my-2">
        The{" "}
        <span className="text-[#FF6849] font-firaCode">
          NoventisDataCleaner
        </span>{" "}
        class acts as the central conductor for the entire Noventis
        preprocessing suite. It allows you to design, configure, and execute a
        sequential data cleaning pipeline, chaining together the modules for
        imputation, outlier handling, encoding, and scaling. Its primary purpose
        is to provide a unified interface to manage the complete workflow—from
        initial data to a model-ready dataset—and to generate comprehensive
        reports on the entire process.
      </p>
    </>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "pipeline_steps",
      type: "list",
      default: (
        <code className="text-[#807F8C]">
          ['impute', 'outlier', 'encode', 'scale']
        </code>
      ),
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A list of strings that defines the sequence of cleaning operations.
            You can customize the order or omit steps as needed.
          </p>
          <div className="mt-4">
            <div className="font-bold">Available steps:</div>
            <ul className="list-disc list-outside pl-5 space-y-1 marker:text-[#FF6849]">
              <li>
                <code className="text-[#FF6849] font-firaCode">'impute'</code>
              </li>
              <li>
                <code className="text-[#FF6849] font-firaCode">'outlier'</code>
              </li>
              <li>
                <code className="text-[#FF6849] font-firaCode">'encode'</code>
              </li>
              <li>
                <code className="text-[#FF6849] font-firaCode">'scale'</code>
              </li>
            </ul>
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "imputer_params",
      type: "dict",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A dictionary of parameters passed directly to the{" "}
            <code className="font-firaCode text-[#FF6849]">
              NoventisImputer
            </code>{" "}
            class. Refer to the{" "}
            <code className="font-firaCode text-[#FF6849]">
              NoventisImputer
            </code>{" "}
            documentation for all available options.
          </p>
          <div className="font-bold mt-4">Example:</div>
          <code className="text-[#FF6849] font-firaCode block">
            {"{'method': 'knn', 'n_neighbors': '5'}"}
          </code>
        </div>
      ),
    },
    {
      name: "outlier_params",
      type: "dict",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A dictionary of parameters passed directly to the{" "}
            <code className="text-[#FF6849] font-firaCode">
              NoventisOutlierHandler
            </code>{" "}
            class. Refer to the{" "}
            <code className="text-[#FF6849] font-firaCode">
              NoventisOutlierHandler
            </code>{" "}
            documentation for available options.
          </p>
          <div className="font-bold mt-4">Example:</div>
          <code className="text-[#FF6849] font-firaCode block">
            {
              "{'default_method': 'winsorize', 'quantile_range': '(0.01, 0.99)'}."
            }
          </code>
        </div>
      ),
    },
    {
      name: "encoder_params",
      type: "dict",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A dictionary of parameters passed directly to the{" "}
            <code className="text-[#FF6849] font-firaCode">
              NoventisEncoder
            </code>{" "}
            class. Refer to the{" "}
            <code className="text-[#FF6849] font-firaCode">
              NoventisEncoder
            </code>{" "}
            documentation for available options.
          </p>
          <div className="font-bold mt-4">Example:</div>
          <code className="text-[#FF6849] font-firaCode block">
            {`{'method': 'auto', 'target_column': 'YourTarget'}`}
          </code>
        </div>
      ),
    },
    {
      name: "scaler_params",
      type: "dict",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A dictionary of parameters passed directly to the NoventisScaler
            class. Refer to the NoventisScaler documentation for available
            options.
          </p>
          <div className="font-bold mt-4">Example:</div>
          <code className="text-[#FF6849] font-firaCode block">
            {`{'method': 'robust'}`}
          </code>
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">False</code>,
      desc: (
        <div className="text-[#807F8C]">
          If <code className="text-[#FF6849] font-firaCode">True</code>, prints
          real-time progress updates to the console as the pipeline executes
          each step.
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="hidden md:block mt-4">
        <DocsTable>
          <colgroup>
            <col className="w-52" />
            <col className="w-44" />
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
            {params.map((p, i) => (
              <DocsTableRow key={`${p.name}-${i}`}>
                <DocsTableCell className="font-semibold text-[#FF6849]">
                  {p.name}
                </DocsTableCell>
                <DocsTableCell className="whitespace-pre-wrap break-words">
                  {p.type}
                </DocsTableCell>
                <DocsTableCell className="align-middle">
                  {p.default}
                </DocsTableCell>
                <DocsTableCell className="align-top">{p.desc}</DocsTableCell>
              </DocsTableRow>
            ))}
          </tbody>
        </DocsTable>
      </div>

      <div className="md:hidden space-y-3">
        {params.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="rounded-lg border border-[#0F2CAB] bg-[#050329] p-4"
          >
            <div className="text-sm font-semibold text-[#FF6849]">{p.name}</div>

            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
              <div className="opacity-70">Type</div>
              <div className="text-right break-words">{p.type}</div>
              <div className="opacity-70">Default</div>
              <div className="text-right">{p.default}</div>
            </div>

            <div className="mt-3 text-sm text-gray-300">{p.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function DocsParameterDataCleaner() {
  const params = [
    {
      name: "data",
      type: "Union[str, pd.DataFrame]",
      default: "",
      desc: (
        <div className="text-[#807F8C] space-y-2">
          The input data. This can be either a pandas DataFrame or a string
          containing the file path to a CSV file.
        </div>
      ),
      accent: true,
    },
    {
      name: "target_column",
      type: "Optional[str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A dictionary of parameters passed directly to the{" "}
            <code className="font-firaCode text-[#FF6849]">
              NoventisImputer
            </code>{" "}
            class. Refer to the{" "}
            <code className="font-firaCode text-[#FF6849]">
              NoventisImputer
            </code>{" "}
            documentation for all available options.
          </p>
          <div className="font-bold mt-4">Example:</div>
          <code className="text-[#FF6849] font-firaCode block">
            {"{'method': 'knn', 'n_neighbors': 5}"}
          </code>
        </div>
      ),
    },
    {
      name: "null_handling",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          A simplified way to specify the imputation method (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">'auto'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'median'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'knn'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'drop'</code>).
        </div>
      ),
    },
    {
      name: "outlier_handling",
      type: "dict",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          A simplified way to specify the outlier handling method (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">'auto'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'iqr_trim'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'winsorize'</code>).
        </div>
      ),
    },
    {
      name: "encoding",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          A simplified way to specify the encoding method (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">'auto'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'ohe'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'target'</code>).
        </div>
      ),
    },
    {
      name: "scaling",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          A simplified way to specify the scaling method (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">'auto'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'minmax'</code>,{" "}
          <code className="text-[#FF6849] font-firaCode">'standard'</code>).
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">True</code>,
      desc: (
        <div className="text-[#807F8C]">
          If <code className="text-[#FF6849] font-firaCode">True</code>,
          displays detailed reports and progress during the process.
        </div>
      ),
    },
    {
      name: "return_instance",
      type: "bool",
      default: <code className="text-[#807F8C]">False</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          Determines the function's output.
          <ul className="list-disc pl-5 mt-1">
            <li className="mt-1">
              If <code className="text-[#FF6849] font-firaCode">False</code>{" "}
              (default), only the cleaned pandas DataFrame is returned.
            </li>
            <li className="mt-1">
              If <code className="text-[#FF6849] font-firaCode">True</code>, the
              function returns a tuple: (cleaned_DataFrame, cleaner_instance) .
              The instance can be used to generate reports or for further
              analysis.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="hidden md:block mt-4">
        <DocsTable>
          <colgroup>
            <col className="w-52" />
            <col className="w-52" />
            <col className="w-44" />
            <col className="w-auto" />
          </colgroup>

          <DocsTableHead>
            <DocsTableRow>
              <DocsTableHeader>Parameter</DocsTableHeader>
              <DocsTableHeader>Type</DocsTableHeader>
              <DocsTableHeader className="text-center">Default</DocsTableHeader>
              <DocsTableHeader>Description</DocsTableHeader>
            </DocsTableRow>
          </DocsTableHead>

          <tbody>
            {params.map((p, i) => (
              <DocsTableRow key={`${p.name}-${i}`}>
                <DocsTableCell className="font-semibold text-[#FF6849]">
                  {p.name}
                </DocsTableCell>
                <DocsTableCell className="whitespace-pre-wrap break-words">
                  {p.type}
                </DocsTableCell>
                <DocsTableCell className="align-middle text-center">
                  {p.default}
                </DocsTableCell>
                <DocsTableCell className="align-top">{p.desc}</DocsTableCell>
              </DocsTableRow>
            ))}
          </tbody>
        </DocsTable>
      </div>

      <div className="md:hidden space-y-3">
        {params.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="rounded-lg border border-[#0F2CAB] bg-[#050329] p-4"
          >
            <div className="text-sm font-semibold text-[#FF6849]">{p.name}</div>

            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
              <div className="opacity-70">Type</div>
              <div className="text-right break-words">{p.type}</div>
              <div className="opacity-70">Default</div>
              <div className="text-right">{p.default}</div>
            </div>

            <div className="mt-3 text-sm text-gray-300">{p.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ImportNoventisDataCleaner() {
  return (
    <div className="py-3 self-stretch text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
      <CodeBlock title="BASH" code="from noventis import data_cleaner" />
    </div>
  );
}

function MethodsNoventisDataCleaner() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          fit_transform(X, y=None) → pd.DataFrame
        </p>
        <p>
          The main method that executes the entire cleaning pipeline. It takes a
          DataFrame X (and an optional target Series y for target-dependent
          steps) and runs it through the sequence of operations defined in
          pipeline_steps. It returns the fully cleaned and processed DataFrame.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">display_summary_report()</p>
        <p>
          Prints a concise, text-based summary of the entire pipeline run to the
          console, including a final data quality score and key metrics from
          each step.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          generate_html_report() → HTML
        </p>
        <p>
          Generates a rich, interactive, and visually appealing HTML report of
          the entire cleaning process. The report includes an overview with a
          final quality score, as well as dedicated tabs for each step with
          detailed summaries and before-and-after visualizations
        </p>
      </li>
    </ul>
  );
}

function DataCleanerIntro() {
  return (
    <>
      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg leading-normal text-justify mt-4">
        For rapid and straightforward data cleaning tasks, the{" "}
        <code className="font-firaCode text-[#FF6849]">data_cleaner</code>{" "}
        function provides a high-level, simplified interface to the{" "}
        <code className="font-firaCode text-[#FF6849]">
          NoventisDataCleaner
        </code>{" "}
        pipeline. With a single function call, you can execute a standard
        cleaning sequence using the most common settings, making it ideal for
        initial data exploration and preparing baseline models.
      </p>

      <Section title="Import">
        <div className="py-1 self-stretch text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
          <CodeBlock
            title="BASH"
            code="from noventis.data_cleaner import data_cleaner"
          />
        </div>
      </Section>
    </>
  );
}

function ModelUsageExamples() {
  return (
    <div className="mt-8 md:mt-10 space-y-6">
      {modelExamples.map((ex, idx) => (
        <div key={idx} className="grid grid-cols-1 gap-6 lg:gap-8 items-start">
          <StepOptionCard
            letter={ex.letter}
            title={ex.title}
            subtitle={ex.subtitle}
          />

          <div className="self-start space-y-10">
            {ex.sections.map((section, sIdx) => {
              const codeItems = section.items.filter((item) => item.code);
              const imageItems = section.items.filter((item) => item.imageSrc);

              const isTwoColumn =
                codeItems.length === 1 && imageItems.length === 1;

              return (
                <div key={sIdx} className="space-y-3">
                  <p className="font-openSans text-[#807F8C]">
                    {section.label}
                  </p>

                  {isTwoColumn ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      <div className="self-start">
                        <CodeBlock
                          title={codeItems[0].title}
                          code={codeItems[0].code}
                          language={codeItems[0].language}
                        />
                      </div>
                      <div className="self-start">
                        <CodeBlock
                          title={imageItems[0].title}
                          imageSrc={imageItems[0].imageSrc}
                          imageAlt={imageItems[0].imageAlt}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {codeItems.map((item, iIdx) => (
                        <div className="self-start">
                          <CodeBlock
                            key={`code-${iIdx}`}
                            title={item.title}
                            code={item.code}
                            language={item.language}
                            imageAlt={item.imageAlt}
                          />
                        </div>
                      ))}

                      {imageItems.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                          {imageItems.map((item, iIdx) => (
                            <div className="self-start">
                              <CodeBlock
                                key={`img-${iIdx}`}
                                title={item.title}
                                imageSrc={item.imageSrc}
                                imageAlt={item.imageAlt}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
