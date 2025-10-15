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
        <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
          DATA_CLEANER
        </div>
        <h3 className="text-white text-4xl font-orbitron font-medium leading-normal">
          NoventisEncoder
        </h3>
        <p className="text-[#807F8C] font-normal font-openSans text-base md:text-lg leading-normal text-justify my-2">
          Encoding categorical features is a critical and often complex step in
          preparing data for machine learning. The choice of encoding strategy
          (One-Hot, Target, or Label encoding) can dramatically affect model
          performance. A poor choice can lead to bloated datasets
          (dimensionality curse) or mislead the model by creating false ordinal
          relationships.
        </p>
        <p className="text-[#807F8C] font-normal font-openSans text-base md:text-lg leading-norma text-justify my-2">
          The{" "}
          <span className="text-[#FF6849] font-firaCode">NoventisEncoder</span>{" "}
          is an advanced tool designed to solve this problem. It not only
          provides a comprehensive suite of encoding methods but also features
          an intelligent{" "}
          <span className="text-[#FF6849] font-firaCode">'auto'</span> mode.
          This mode analyzes each categorical column's characteristics (such as
          its number of unique values , its relationship with the target
          variable, and its potential memory impact) to recommend and apply the
          most effective encoding strategy automatically.
        </p>

        <Section title="Import">
          <div className="py-3 self-stretch">
            <CodeBlock
              title="BASH"
              code="from noventis.data_cleaner import NoventisEncoder"
            />
          </div>
        </Section>

        <Divider />

        <Section title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section title="Methods">
          <ul className="list-disc text-lg list-outside pl-5 space-y-5 text-[#807F8C] marker:text-[#FF6849] font-openSans">
            <li>
              <p className="font-bold text-[#FF6849]">fit(X, y)</p>
              <p>
                Analyzes the dataset and fits the appropriate encoder for each
                categorical column. The target series <code>y</code> is required
                for <span className="text-[#FF6849] font-firaCode">'auto'</span>{" "}
                and{" "}
                <span className="text-[#FF6849] font-firaCode">'target'</span>{" "}
                methods.
              </p>
            </li>

            <li>
              <p className="font-bold text-[#FF6849]">
                transform(X) → pd.DataFrame
              </p>
              <p>
                Applies the learned encoding to the input DataFrame{" "}
                <code>X</code> and returns the transformed data as a new{" "}
                <code>pd.DataFrame</code>.
              </p>
            </li>

            <li>
              <p className="font-bold text-[#FF6849]">
                fit_transform(X, y) → pd.DataFrame
              </p>
              <p>
                A convenient shortcut that performs both <code>fit</code> and{" "}
                <code>transform</code> operations in a single step, returning
                the encoded DataFrame.
              </p>
            </li>
          </ul>
        </Section>

        <Divider />

        <Section
          title="Model Usage Examples"
          description={
            <div className="text-[#807F8C] font-openSans text-lg leading-normal">
              First, let's create sample data with some obvious outliers.
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

data = {
    'Country': ['USA', 'UK', 'Canada', 'USA', 'Germany', 'UK', 'USA', 'France', 'Canada', 'Germany'],
    'Education': ['Bachelors', 'Masters', 'PhD', 'Bachelors', 'Masters', 'Bachelors', 'PhD', 'Masters', 'Masters', 'Bachelors'],
    'Size': ['Medium', 'Small', 'Large', 'Medium', 'Large', 'Small', 'Medium', 'Large', 'Medium', 'Small'],
    'Has_Pet': ['Yes', 'No', 'No', 'Yes', 'Yes', 'No', 'Yes', 'No', 'Yes', 'No'],
    'Target': [1, 0, 0, 1, 0, 0, 1, 0, 1, 1]
}
df = pd.DataFrame(data)
y = df['Target']
X = df.drop('Target', axis=1)
`);

const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Automatic Encoding (Recommended)</>,
    subtitle: (
      <>
        This is the most powerful feature. The encoder will analyze each column
        and apply the best strategy.{" "}
        <span className="font-firaCode text-[#FF6849]">verbose=True {""}</span>
        is highly recommended to understand the decisions made.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Initialize in 'auto' mode, providing the target column name
encoder_auto = NoventisEncoder(method='auto', target_column='Target', verbose=True)

# Fit and transform the data
df_encoded_auto = encoder_auto.fit_transform(X, y)

print("\nTransformed DataFrame Head:")
print(df_encoded_auto.head())
`),
  },
  {
    letter: "02",
    title: <>Example 2: Manual Ordinal Encoding</>,
    subtitle: (
      <>
        This is used when a feature has a clear, inherent order. You must
        provide the mapping.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Define the explicit order for the 'Size' column
size_mapping = {
    'Size': {'Small': 1, 'Medium': 2, 'Large': 3}
}

# Initialize in 'ordinal' mode with the mapping
encoder_ordinal = NoventisEncoder(method='ordinal', 
                                  columns_to_encode=['Size'], 
                                  category_mapping=size_mapping)

df_encoded_ordinal = encoder_ordinal.fit_transform(X)
print(df_encoded_ordinal[['Size_ordinal_encoded']].head())
`),
  },
  {
    letter: "03",
    title: <>Example 3: Manual Target Encoding</>,
    subtitle: (
      <>
        This example applies Target Encoding to the 'Country' column, using
        cross-validation to ensure the encoding is robust.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Initialize in 'target' mode for a specific column
encoder_target = NoventisEncoder(method='target',
                                 columns_to_encode=['Country'],
                                 target_column='Target',
                                 cv=3) # Use 3 folds for this small dataset

df_encoded_target = encoder_target.fit_transform(X, y)
print(df_encoded_target[['Country_target_encoded']].head())

`),
  },
];

function DocsParameter() {
  const params = [
    {
      name: "method",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2 leading-relaxed">
          <ul className="list-disc list-outside pl-5 space-y-1 marker:text-[#FF6849]">
            <li>
              <b className="text-[#FF6849] font-openSans">'auto'</b>:{" "}
              <span className="text-[#FF6849] font-openSans">
                (Recommended)
              </span>{" "}
              Automatically selects the best encoding method for each column
              based on its statistical properties. Requires{" "}
              <code>target_column</code> to be set.
            </li>
            <li>
              <b className="text-[#FF6849]">label</b>: Converts categories into
              integers (0, 1, 2, …). Best for binary features or ordinal
              features where the default integer assignment is acceptable.
            </li>
            <li>
              <b className="text-[#FF6849]">ohe</b>{" "}
              <span>(One-Hot Encoding)</span>: Creates a new binary (0/1) column
              for each category. Best for low-cardinality nominal features
              (e.g., ≤ 15 categories).
            </li>
            <li>
              <b className="text-[#FF6849]">target</b>: Replaces each category
              with the mean of the target variable for that category. Powerful
              for features with a strong relationship to the target; prone to
              overfitting but mitigated by cross-validation and smoothing.
            </li>
            <li>
              <b className="text-[#FF6849]">ordinal</b>: Converts categories to
              integers based on a user-defined order. Requires{" "}
              <code>category_mapping</code>. Best for features with a clear
              inherent order (e.g., “Low”, “Medium”, “High”).
            </li>
            <li>
              <b className="text-[#FF6849]">binary</b>: Converts categories into
              binary code and creates a column for each bit. A memory-efficient
              alternative to OHE for medium-cardinality features (e.g., 15–50
              categories).
            </li>
            <li>
              <b className="text-[#FF6849]">hashing</b>: Uses a hashing function
              to convert categories into a fixed number of features.
              Memory-efficient for very high-cardinality features, but can
              result in collisions (different categories mapped to the same
              hash).
            </li>
          </ul>

          <div className="pt-1">
            <b className="text-[#FF6849]">How does method='auto' work?</b>
            <p>
              The <code>auto</code> mode uses a rule-based system to choose an
              optimal encoder for each column:
            </p>
          </div>

          <ol className="list-decimal list-outside pl-5 space-y-1 marker:text-[#FF6849]">
            <li>
              <b className="text-[#FF6849]">Binary features</b> (only 2 unique
              values): use <code>label</code> encoding.
            </li>
            <li>
              <b className="text-[#FF6849]">High cardinality (&gt;50)</b>: use{" "}
              <code>target</code> if the feature is strongly correlated with the
              target; otherwise fall back to memory-efficient{" "}
              <code>hashing</code>.
            </li>
            <li>
              <b className="text-[#FF6849]">Medium cardinality (16–50)</b>:
              prefer <code>target</code> if correlated; otherwise use{" "}
              <code>binary</code> to balance performance and memory.
            </li>
            <li>
              <b className="text-[#FF6849]">Low cardinality (3–15)</b>: if
              correlation is very high and order is meaningful, use{" "}
              <code>ordinal</code>
              (requires mapping). Otherwise default to <code>ohe</code>.
            </li>
          </ol>
        </div>
      ),
      accent: true,
    },
    {
      name: "target_column",
      type: "Optional[str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The name of the target variable (label) column. This is
          <b className="text-[#FF6849]"> required</b> when <code>method</code>{" "}
          is set to
          <code> 'auto'</code> or <code>'target'</code>.
        </div>
      ),
    },
    {
      name: "columns_to_encode",
      type: "Optional[List[str]]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          A list of specific column names to encode. If <code>None</code>, all
          categorical columns in the DataFrame will be processed.
        </div>
      ),
    },
    {
      name: "category_mapping",
      type: "Optional[Dict[str, Dict]]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          A dictionary defining the explicit order for ordinal features (e.g.,{" "}
          <code>{`{ "Size": { "order": ["Small", "Medium", "Large"] } }`}</code>
          ). This is required when <code>method</code> = <code>'ordinal'</code>.
        </div>
      ),
    },
    {
      name: "cv",
      type: "Union[float, str]",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The smoothing parameter for{" "}
          <b className="text-[#FF6849]">TargetEncoder</b>, which helps
          regularize the encoding for categories with few samples.
        </div>
      ),
    },
    {
      name: "target_type",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The type of target variable (<code>'binary'</code> or{" "}
          <code>'continuous'</code>). Used by{" "}
          <b className="text-[#FF6849]">TargetEncoder</b>. If
          <code> 'auto'</code>, the type is inferred from{" "}
          <code>target_column</code>.
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">false</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          If <b className="text-[#FF6849]">True</b>, prints a detailed analysis
          and summary of the encoding process.
        </div>
      ),
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
            {params.map((p) => (
              <DocsTableRow key={p.name}>
                <DocsTableCell
                  className={`font-semibold ${
                    p.accent ? "text-[#FF6849]" : ""
                  }`}
                >
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
