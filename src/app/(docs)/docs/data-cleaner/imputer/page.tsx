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
import { Divider } from "@/components/divider";
import { Section } from "@/components/section";
import { dedent } from "@/lib/dedent";
import { StepOptionCard } from "@/components/step-card";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-1">
        <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
          DATA_CLEANER
        </div>
        <h3 className="text-white text-4xl font-orbitron font-medium leading-normal">
          NoventisImputer
        </h3>
        <p className="text-[#807F8C] font-normal font-openSans text-base md:text-lg leading-normal text-justify my-2">
          Handling missing data (NaNs) is a critical preprocessing step that can
          significantly impact model performance. Manually filling these values
          for each column can be tedious and error-prone. The NoventisImputer
          provides an intelligent and flexible solution to automate this
          process.
        </p>
        <p className="text-[#807F8C] font-normal font-openSans text-base md:text-lg leading-norma text-justify my-2">
          It automatically detects column types (numeric, categorical) and
          applies appropriate imputation strategies. Whether you need a simple
          automatic fix, a powerful global method like KNN, or a specific
          strategy for each column, NoventisImputer streamlines the entire
          workflow in a scikit-learn compatible interface.
        </p>

        <Section title="Import">
          <div className="py-3 self-stretch">
            <CodeBlock
              title="BASH"
              code="from noventis.data_cleaner import NoventisImputer"
            />
          </div>
        </Section>

        <Divider />

        <Section titleClass="my-4" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section title="Methods" titleClass="my-3">
          <ul className="list-disc text-lg list-outside pl-5 space-y-5 text-[#807F8C] marker:text-[#FF6849] font-openSans">
            <li>
              <p className="font-bold text-[#FF6849]">fit(X)</p>
              <p>
                Analyzes the data and learns the imputation strategy from the
                input DataFrame X.
              </p>
            </li>
            <li>
              <p className="font-bold text-[#FF6849]">transform(X)</p>
              <p>
                pd.DataFrame Applies the learned imputation to the DataFrame X
                and returns the transformed data.
              </p>
            </li>
            <li>
              <p className="font-bold text-[#FF6849]">fit_transform(X)</p>
              <p>
                pd.DataFrame A convenient method that performs the fit and
                transform operations in a single step.
              </p>
            </li>
          </ul>
        </Section>

        <Divider />

        <Section
          title="Model Usage Examples"
          titleClass="my-4"
          description={
            <div className="text-[#807F8C] font-openSans text-lg leading-normal">
              First, let's create some sample data with missing values.
            </div>
          }
        >
          <div className="my-4">
            <CodeBlock title="BASH" code={py} />
          </div>
          <div className="mt-12 space-y-12">
            {modelExamples.map((s, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start"
              >
                <StepOptionCard
                  letter={s.letter}
                  title={s.title}
                  subtitle={s.subtitle}
                />
                <div className="self-start">
                  <CodeBlock
                    title={s.language}
                    code={s.code}
                    language={s.language}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

const py = dedent(`
  import pandas as pd
  import numpy as np

  df = pd.DataFrame({
      'Age': [22, 38, 26, 35, np.nan, 28, 50, np.nan],
      'Salary': [72000, 48000, 54000, 61000, 75000, np.nan, 83000, 45000],
      'City': ['London', 'Paris', 'New York', np.nan, 'Tokyo', 'London', 'Paris', 'New York'],
      'Experience': [1, 10, 3, 8, 5, 4, 20, np.nan]  # An integer column
  })
`);

const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Automatic Imputation (Default)</>,
    subtitle: (
      <>
        This is the simplest use case. The imputer will automatically use the
        mean for numeric columns (
        <code className="text-[#FF6849] text-lg">Age, Salary, Experience</code>)
        and the mode for the categorical column (City).
      </>
    ),
    language: "BASH",
    code: `# Initialize the imputer with no parameters for auto mode
imputer = NoventisImputer(verbose=True)

# Fit and transform the data
df_imputed = imputer.fit_transform(df)
print(df_imputed)`,
  },
  {
    letter: "02",
    title: <>Example 2: Using a Global Method (KNN)</>,
    subtitle: (
      <>
        Here, we apply the <b className="text-[#FF6849]">K-Nearest Neighbors</b>{" "}
        algorithm to all numeric columns. The imputer is smart enough to use a
        fallback method (<b className="text-[#FF6849]">mode</b>) for categorical
        columns where KNN is not applicable.
      </>
    ),
    language: "BASH",
    code: `# Initialize with method='knn'
imputer_knn = NoventisImputer(method='knn', n_neighbors=3, verbose=True)

# Fit and transform
df_knn_imputed = imputer_knn.fit_transform(df)
print(df_knn_imputed)`,
  },
  {
    letter: "03",
    title: <>Example 3: Per-Column Custom Strategy</>,
    subtitle: (
      <>
        This example demonstrates the highest level of control, where we define
        a specific imputation method for each column.
      </>
    ),
    language: "BASH",
    code: `# Define a dictionary with specific methods for each column
custom_methods = {
    'Age': 'median',
    'Salary': 'mean',
    'City': 'mode',
    'Experience': 'constant'
}

# Initialize the imputer with the custom dictionary and a fill_value for 'constant'
imputer_custom = NoventisImputer(method=custom_methods, fill_value=0, verbose=True)

# Fit and transform
df_custom_imputed = imputer_custom.fit_transform(df)
print(df_custom_imputed)`,
  },
];

function DocsParameter() {
  const params = [
    {
      name: "method",
      type: "str, dict, or None",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="space-y-3">
          <div className="text-[#807F8C]">
            <b className="text-[#FF6849]">None (Auto Mode):</b> This is the
            default behavior. It intelligently selects the best simple strategy
            for each column:
            <ul className="list-disc list-outside pl-5 space-y-1 mt-2 text-[#807F8C]">
              <li>
                <b>'mean' </b>for numeric (float) columns.
              </li>
              <li>
                <b>'mode' </b>for categorical (object) columns.
              </li>
            </ul>
          </div>

          <div className="text-[#807F8C]">
            <b className="text-[#FF6849]">str (Global Method):</b> Applies a
            single method to all columns with missing values. The available
            options are:
          </div>

          <ul className="list-disc list-outside pl-5 space-y-1 text-[#807F8C] marker:text-[#FF6849]">
            <li>
              <code className="text-[#FF6849] font-firaCode">'mean'</code>:
              Fills with the column mean (for numeric columns).
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'median'</code>:
              Fills with the column median (for numeric columns).
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'mode'</code>:
              Fills with the most frequent value (mode).
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'knn'</code>: Uses
              K-Nearest Neighbors to impute values based on the nearest data
              points. This is only applied to numeric columns.
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'constant'</code>:
              Fills with a fixed value defined by <code>fill_value</code>.
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'ffill'</code>:
              Forward-fills the last valid observation.
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'bfill'</code>:
              Backward-fills with the next valid observation.
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'drop'</code>:
              Drops rows containing missing values in the processed columns.
            </li>
          </ul>

          <div className="text-[#807F8C]">
            <b className="text-[#FF6849]">dict (Per-Column Method):</b> Provides
            fine-grained control by specifying a method for each column.
            <ul className="list-disc list-outside pl-5 space-y-1 mt-2 text-[#807F8C]">
              <li>
                <span>Example: </span>{" "}
                {`{ "Age": "median", "Salary": "knn", "Embarked": "mode" }`}
              </li>
            </ul>
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "columns",
      type: "Optional[List[str]]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          A list of column names to apply the imputation to. If{" "}
          <code>None</code>, the imputer will automatically find and process all
          columns in the DataFrame that have missing values.
        </div>
      ),
    },
    {
      name: "fill_value",
      type: "Any",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The constant value to use for imputation when{" "}
          <code>method="constant"</code>.
        </div>
      ),
    },
    {
      name: "n_neighbors",
      type: "int",
      default: <code className="text-[#807F8C]">5</code>,
      desc: (
        <div className="text-[#807F8C]">
          The number of neighboring samples to use for imputation when{" "}
          <code>method="knn"</code>.
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">False</code>,
      desc: (
        <div className="text-[#807F8C]">
          If <code className="text-[#FF6849]">True</code>, a summary of the
          imputation process will be printed after fitting.
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="hidden md:block mt-4">
        <DocsTable>
          <colgroup>
            <col className="w-48" />
            <col className="w-48" />
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
            {params.map((p) => (
              <DocsTableRow key={p.name}>
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
              <div className="text-right break-words">{p.type}</div>
              <div className="opacity-70">Default</div>
              <div className="text-right">{p.default}</div>
            </div>

            <div className="mt-3 text-sm text-gray-300 font-normal">
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
