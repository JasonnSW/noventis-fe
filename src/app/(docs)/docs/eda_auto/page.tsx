import React from "react";

import { CodeBlock } from "@/components/code-block";
import {
  DocsTable,
  DocsTableCell,
  DocsTableHead,
  DocsTableHeader,
  DocsTableRow,
} from "@/components/docs-table";
import { Section } from "@/components/section";
import { Divider } from "@/components/divider";
import { dedent } from "@/lib/dedent";
import { StepOptionCard } from "@/components/step-card";

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <EdaAutoHeader />
        <div className="py-3 self-stretch">
          <CodeBlock
            title="BASH"
            code="from noventis.eda_auto import NoventisAutoEDA"
          />
        </div>

        <Divider />

        <Section titleClass="my-2" title="Key Features">
          <EdaAutoKeyFeatures />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section titleClass="mb-4" title="Main Workflow Method">
          <EdaAutoMainWorkflow />
        </Section>

        <Divider />

        <Section titleClass="mb-4" title="The HTML Report">
          <EdaAutoReportingAnalysis />
        </Section>

        <Divider />

        <Section titleClass="mb-2" title="Usage Examples">
          <p className="font-orbitron text-sm md:text-base lg:text-xl text-[#807F8C] mt-10 mb-4">
            Prepare Dataset
          </p>
          <CodeBlock title="BASH" code={prepareDataset} />
          <div className="mt-10 space-y-12">
            {modelExamples.map((ex, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-6 lg:gap-8 items-start"
              >
                <StepOptionCard
                  letter={ex.letter}
                  title={ex.title}
                  subtitle={ex.subtitle}
                />

                <div className="space-y-10">
                  {ex.sections.map((section, sIdx) => {
                    const codeItems = section.items.filter((item) => item.code);
                    const imageItems = section.items.filter(
                      (item) => item.imageSrc
                    );

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
        </Section>
      </div>
    </section>
  );
}

const prepareDataset = dedent(`
import pandas as pd
from noventis.eda_auto import NoventisAutoEDA

#Assume ‘AmesHousing.csv’ is in your folder
df = pd.read_csv('AmesHousing.csv')`);

export const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Standard Comprehensive EDA</>,
    subtitle: (
      <>
        Generate a full EDA report with all standard analytical tabs for a given
        target variable.
      </>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
analyzer_default = NoventisAutoEDA(data=df, 
target='SalePrice')

analyzer_default.run()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-auto-eda-1.svg",
            imageAlt: "Standard Comprehensive EDA",
          },
        ],
      },
    ],
  },

  {
    letter: "02",
    title: <>Example 2: Focused Business Intelligence Dashboard</>,
    subtitle: (
      <>
        Generate a high-level report tailored for business stakeholders, showing
        only the business-focused dashboard.
      </>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
analyzer_business = NoventisAutoEDA(data=df, 
target='SalePrice', personality='business')

analyzer_business.run(show_base_viz=False)
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-auto-eda-2.svg",
            imageAlt: "Focused Business Intelligence Dashboard",
          },
        ],
      },
    ],
  },

  {
    letter: "03",
    title: <>Example 3: Rigorous Academic Statistical Reportn</>,
    subtitle: (
      <>Generate a deep-dive statistical report to validate data assumptions.</>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
analyzer_academic = NoventisAutoEDA(df, 
target='SalePrice', personality='academic')

analyzer_academic.run()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-auto-eda-3.svg",
            imageAlt: "Rigorous Academic Statistical Report",
          },
        ],
      },
    ],
  },
  {
    letter: "04",
    title: <>Example 4: All-in-One Report</>,
    subtitle: (
      <>
        Generate a single report that includes the Business dashboard, the
        Academic dashboard, and all the standard EDA tabs.
      </>
    ),
    sections: [
      {
        label: "",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
analyzer_full = NoventisAutoEDA(data=df, 
target='SalePrice', personality='all')

analyzer_full.run()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-auto-eda-4.svg",
            imageAlt: "All-in-One Report",
          },
        ],
      },
    ],
  },
];

function EdaAutoHeader() {
  return (
    <>
      <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
        EDA_AUTO
      </div>
      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal">
        NoventisAutoEDA
      </h3>
      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        Exploratory Data Analysis (EDA) is the crucial first step in any data
        science project, essential for understanding the structure, patterns,
        and quality of a dataset. However, performing a thorough EDA manually
        can be a time-consuming and repetitive task.
      </p>
      <p className="text-[#807F8C] mt-2 font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        <code className="font-firaCode text-[#FF6849]">NoventisAutoEDA </code>{" "}
        is a powerful tool designed to automate this entire process. With just a
        few lines of code, it generates a comprehensive, interactive HTML
        dashboard that provides deep insights into your dataset. Its most unique
        feature is its <b>"personality"</b> system, which tailors the analysis
        and visualizations to specific user needs, whether you're a business
        analyst looking for actionable KPIs, a researcher needing rigorous
        statistical validation, or a data scientist wanting a complete overview.
      </p>
    </>
  );
}

function EdaAutoKeyFeatures() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">One-Click EDA</p>
        <p>
          Generates a full EDA report with a single command, saving hours of
          manual work.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Interactive HTML Dashboard</p>
        <p>
          All insights are presented in a user-friendly, tabbed HTML report that
          is easy to navigate and share.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Persona-Driven Insights</p>
        <p>
          The analysis is tailored to your needs through different
          "personalities" (
          <code className="font-firaCode text-[#FF6849]">
            'default', 'business', 'academic'
          </code>
          ).
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Target-Aware Analysis</p>
        <p>
          If a target variable is specified, the report includes additional
          analyses showing relationships between features and the target.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Comprehensive Analysis</p>
        <p>
          Covers all essential EDA aspects, including descriptive statistics,
          missing value analysis, outlier detection, distribution plotting, and
          correlation analysis.
        </p>
      </li>
    </ul>
  );
}

function EdaAutoMainWorkflow() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .run(show_base_viz=True) → HTML
        </p>
        <p>
          This is the primary method that triggers the analysis and generates
          the final interactive HTML report.
        </p>

        <ul className="list-disc list-outside pl-6 mt-2 space-y-2 text-[#807F8C]">
          <li>
            <code className="font-firaCode text-[#FF6849]">
              show_base_viz (bool):
            </code>{" "}
            If True (default), the report will include all the standard,
            detailed EDA tabs (Overview, Missing Values, Correlation, etc.). If
            set to <code className="font-firaCode text-[#FF6849]">False</code>,
            the report will only contain the specialized 'personality'
            dashboards, which is useful for creating focused, high-level reports
            for specific audiences.
          </li>
        </ul>
      </li>
    </ul>
  );
}

function EdaAutoReportingAnalysis() {
  return (
    <>
      <p className="mb-3 font-openSans text-[#807F8C]">
        The output is a detailed HTML dashboard with several interactive tabs.
      </p>

      <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
        <li className="marker:text-white">
          <p className="font-bold text-white">
            Standard Analysis Tabs (when{" "}
            <code className="font-firaCode text-[#FF6849]">
              show_base_viz=True
            </code>
            )
          </p>
          <ul className="list-disc list-outside pl-6 mt-2 space-y-1 text-[#807F8C] [&>li]:marker:text-[#807F8C]">
            <li>
              <b>Overview:</b> Basic information like dataset shape, column
              types, and a data preview.
            </li>
            <li>
              <b>Target Analysis:</b> Detailed breakdown of the target
              variable’s distribution.
            </li>
            <li>
              <b>Descriptive Stats:</b> A comprehensive table of statistical
              summaries for all columns.
            </li>
            <li>
              <b>Missing Values:</b> Analysis of missing data with counts,
              percentages, and a heatmap.
            </li>
            <li>
              <b>Outlier Distribution:</b> Boxplots and summaries for outliers
              in numeric columns.
            </li>
            <li>
              <b>Numerical Distribution:</b> Histograms and skewness analysis
              for all numeric columns.
            </li>
            <li>
              <b>Correlation:</b> A correlation matrix (heatmap or table) and
              lists of highly correlated pairs.
            </li>
          </ul>
        </li>

        <li className="marker:text-white">
          <p className="font-bold text-white">
            Business Intelligence Dashboard (when{" "}
            <code className="font-firaCode text-[#FF6849]">
              personality='business'
            </code>
            )
          </p>
          <ul className="list-disc list-outside pl-6 mt-2 space-y-1 text-[#807F8C] [&>li]:marker:text-[#807F8C]">
            <li>
              <b>Data Quality ROI:</b> A KPI dashboard showing the impact of
              missing data, outliers, and duplicates on overall data quality.
            </li>
            <li>
              <b>Customer Intelligence:</b> An analysis of the most impactful
              categorical feature to identify key customer segments or product
              categories.
            </li>
            <li>
              <b>Priority Matrix:</b> A quadrant analysis that maps feature
              impact against data quality to help prioritize data cleaning
              efforts.
            </li>
          </ul>
        </li>

        <li className="marker:text-white">
          <p className="font-bold text-white">
            Academic Statistical Dashboard (when{" "}
            <code className="font-firaCode text-[#FF6849]">
              personality='academic'
            </code>
            )
          </p>
          <ul className="list-disc list-outside pl-6 mt-2 space-y-1 text-[#807F8C] [&>li]:marker:text-[#807F8C]">
            <li>
              <b>Distribution Test:</b> Applies the Shapiro–Wilk test to key
              numeric variables to formally test for normality.
            </li>
            <li>
              <b>Correlation Validation:</b> Provides a deep dive into
              multicollinearity by calculating the Variance Inflation Factor
              (VIF) for all numeric features.
            </li>
            <li>
              <b>Model Diagnostics:</b> Fits a simple baseline model to provide
              initial insights into feature importance and residual patterns.
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "data",
      type: "Union[pd.DataFrame, str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The input data. This can be an existing pandas DataFrame or a string
          containing the file path to a CSV file.
        </div>
      ),
      accent: true,
    },
    {
      name: "target",
      type: "str",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          An optional string specifying the name of the target column. Providing
          a target enables deeper, bivariate analysis within the report.
        </div>
      ),
      accent: true,
    },
    {
      name: "personality",
      type: "str",
      default: <code className="text-[#807F8C]">'default'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            Determines the focus and content of the report, tailoring it to a
            specific audience.
          </p>
          <div className="space-y-1">
            <div>
              • <code className="text-[#FF6849] font-firaCode">'default'</code>:
              Generates a standard, comprehensive EDA report covering all
              fundamental aspects of the data. This is ideal for general-purpose
              data science exploration.
            </div>
            <div>
              • <code className="text-[#FF6849] font-firaCode">'business'</code>
              : Generates a high-level dashboard focused on actionable business
              insights. It includes panels for Data Quality ROI, Customer
              Intelligence (segmentation), and a Feature Priority Matrix to
              guide strategic decisions.
            </div>
            <div>
              • <code className="text-[#FF6849] font-firaCode">'academic'</code>
              : Generates a deep-dive dashboard for rigorous statistical
              validation. It includes panels for Normality Tests (Shapiro-Wilk),
              Multicollinearity Analysis (VIF), and baseline Model Diagnostics.
            </div>
            <div>
              • <code className="text-[#FF6849] font-firaCode">'all'</code>:
              Generates a report containing both the 'business' and 'academic'
              dashboards in separate tabs.
            </div>
          </div>
        </div>
      ),
      accent: true,
    },
  ];

  return (
    <>
      <div className="hidden md:block mt-4">
        <DocsTable>
          <colgroup>
            <col className="w-56" />
            <col className="w-56" />
            <col className="w-40" />
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
                <DocsTableCell className="font-semibold text-[#FF6849] align-middle">
                  {p.name}
                </DocsTableCell>
                <DocsTableCell className="whitespace-pre-wrap break-words align-middle">
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
            <div
              className={`text-sm font-semibold ${
                p.accent ? "text-[#FF6849]" : "text-white"
              }`}
            >
              {p.name}
            </div>

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
