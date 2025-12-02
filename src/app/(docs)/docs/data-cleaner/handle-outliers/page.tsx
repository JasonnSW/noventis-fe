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
          <ImportBlock />
        </Section>

        <Divider />

        <Section titleClass="my-4" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section title="Methods">
          <MethodsBlock />
        </Section>

        <Divider />

        <Section
          title="Model Usage Examples"
          description={
            <div className="text-[#807F8C] font-openSans text-base lg:text-lg leading-normal">
              First, let&apos;s create sample data with some obvious outliers.
            </div>
          }
        >
          <ExamplesIntro />
          <ModelUsageExamples />
        </Section>
      </div>
    </main>
  );
}

const py = dedent(`
import pandas as pd
import numpy as np

# Create a base normal distribution
base_data = np.random.normal(loc=100, scale=20, size=500)

# Add some extreme outliers
outliers = np.array([5, 10, 250, 300, 320])

df = pd.DataFrame({
    'Feature_A': np.concatenate([base_data, outliers]),
    'Feature_B': np.concatenate([np.random.normal(50, 10, 500), np.array([-50, 150, 160])])
})
`);

const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Automatic Handling</>,
    subtitle: (
      <>
        This is the simplest approach. The handler will automatically decide the
        best method for each feature based on its statistical properties.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Initialize the handler with default 'auto' mode
handler = NoventisOutlierHandler(verbose=True)

# Fit and transform the data
df_cleaned = handler.fit_transform(df)

print(f"Original shape: {df.shape}")
print(f"Cleaned shape: {df_cleaned.shape}")
`),
  },
  {
    letter: "02",
    title: <>Example 2: Global Method (Winsorizing)</>,
    subtitle: (
      <>
        This example applies a single strategy to all columns. We will use{" "}
        <b className="text-[#FF6849]">'winsorize'</b> to cap extreme values at
        the boundaries defined by the 1st and 99th percentiles instead of
        removing them, which is useful when you want to preserve all your data
        rows.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Initialize with a global method and a specific quantile range
handler_winsorize = NoventisOutlierHandler(
    default_method='winsorize',
    quantile_range=(0.01, 0.99),
    verbose=True
)

# Fit and transform
df_winsorized = handler_winsorize.fit_transform(df)

print(f"Original shape: {df.shape}")
print(f"Winsorized shape: {df_winsorized.shape}")

print("\\nMin/Max values before:\\n", df.agg(['min', 'max']))
print("\\nMin/Max values after:\\n", df_winsorized.agg(['min', 'max']))
`),
  },
  {
    letter: "03",
    title: <>Example 3: Per-Column Custom Strategy</>,
    subtitle: (
      <>
        This shows how to apply different rules to different columns, providing
        maximum control over the process.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Define a dictionary with a specific method for each feature
method_map = {
    'Feature_A': 'iqr_trim',   # Use robust IQR trimming for Feature_A
    'Feature_B': 'winsorize'   # Cap extreme values for Feature_B
}

# Initialize the handler with the custom map
handler_custom = NoventisOutlierHandler(
      feature_method_map=method_map,
      verbose=True
)

# Fit and transform
df_custom = handler_custom.fit_transform(df)

print(f"Original shape: {df.shape}")
print(f"Custom handled shape: {df_custom.shape}")
`),
  },
];

function Header() {
  return (
    <>
      <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
        DATA_CLEANER
      </div>

      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal">
        NoventisOutlierHandler
      </h3>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg leading-normal text-justify my-2">
        Outliers, or extreme values, can significantly skew statistical analyses
        and degrade the performance of machine learning models. Handling them
        correctly is a crucial step in data preprocessing. The{" "}
        <span className="text-[#FF6849] font-firaCode">
          NoventisOutlierHandler
        </span>{" "}
        provides a systematic and flexible framework for identifying and
        managing outliers in your dataset.
      </p>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg leading-normal text-justify my-2">
        This tool allows you to choose between two primary strategies: removing
        outlier rows entirely (trimming) or capping their values to a reasonable
        range (winsorizing). It features an intelligent{" "}
        <span className="text-[#FF6849] font-firaCode">'auto'</span> mode to
        select an appropriate strategy based on your data&apos;s
        characteristics, but also offers fine-grained control to apply specific
        methods to different columns.
      </p>
    </>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "feature_method_map",
      type: "Optional[Dict[str, str]]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2 leading-relaxed">
          A dictionary to specify a unique outlier handling method for each
          column. Any column not in this map will use the default_method.
          <div className="mt-4 font-openSans text-sm">
            <span className="text-[#807F8C] font-normal block mb-1">
              Example:
            </span>{" "}
            <code className="text-[#FF6849] font-firaCode font-openSans block">
              {"{ 'Salary': 'winsorize', 'Age': 'iqr_trim' }"}
            </code>
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "default_method",
      type: "str",
      default: <code className="text-[#807F8C]">'auto'</code>,
      desc: (
        <div className="text-[#807F8C] space-y-1 leading-relaxed">
          <div className="font-openSans">
            The default method applied to all numeric columns not specified in{" "}
            <code>feature_method_map</code>.
          </div>

          <ol className="list-decimal font-openSans list-outside pl-5 space-y-1 marker:text-[#FF6849]">
            <li>
              <span className="text-[#FF6849] font-firaCode">'auto'</span>:
              Intelligently selects a method based on data properties.
            </li>
            <li>
              <span className="text-[#FF6849] font-firaCode">
                'quantile_trim'
              </span>
              : Removes rows where values fall outside the defined{" "}
              <code>quantile_range</code>.
            </li>
            <li>
              <span className="text-[#FF6849] font-firaCode">'iqr_trim'</span>:
              Removes rows where values fall outside the IQR range defined by{" "}
              <code>iqr_multiplier</code>.
            </li>
            <li>
              <span className="text-[#FF6849] font-firaCode">'winsorize'</span>:
              Caps values at boundaries defined by <code>quantile_range</code>{" "}
              instead of removing rows.
            </li>
            <li>
              <span className="text-[#FF6849] font-firaCode">'none'</span>:
              Skips outlier handling for the column.
            </li>
          </ol>

          <div className="pt-1">
            <b className="text-[#FF6849]">
              How does default_method='auto' work?
            </b>
            <p>
              When 'auto' is selected, the handler chooses a method for each
              column based on the following logic:
            </p>
          </div>
          <ol className="list-decimal list-outside pl-5 space-y-1 marker:text-[#FF6849]">
            <li>
              <span className="text-[#FF6849]">Small Dataset?</span>: If a
              column has fewer data points than <code>min_data_threshold</code>,
              it uses <code>iqr_trim</code> (robust for small samples).
            </li>
            <li>
              <span className="text-[#FF6849]">Skewed Data?</span>: If absolute
              skewness &gt; <code>skew_threshold</code>, it uses{" "}
              <code>winsorize</code> (cap outliers without losing data).
            </li>
            <li>
              <span className="text-[#FF6849]">Otherwise</span>: For larger,
              non-skewed datasets, it uses <code>quantile_trim</code>.
            </li>
          </ol>
        </div>
      ),
    },
    {
      name: "iqr_multiplier",
      type: "float",
      default: <code className="text-[#807F8C]">1.5</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The multiplier for the Interquartile Range (IQR) to determine the
          outlier boundaries when using{" "}
          <span className="text-[#FF6849]">'iqr_trim'</span> method. The
          Boundaries are calculated as{" "}
          <span className="text-[#FF6849]">Q1 - multiplier·IQR</span> and{" "}
          <span className="text-[#FF6849]">Q3 + multiplier·IQR</span>.
        </div>
      ),
    },
    {
      name: "quantile_range",
      type: "Tuple[float, float]",
      default: <code className="text-[#807F8C]">(0.05, 0.95)</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          A tuple specifying the lower and upper quantile boundaries. This is
          used by the
          <span className="text-[#FF6849]"> quantile_trim </span> method for
          trimming and <span className="text-[#FF6849]">winsorize</span> method
          for capping.
        </div>
      ),
    },
    {
      name: "min_data_threshold",
      type: "int",
      default: <code className="text-[#807F8C]">100</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          Minimum number of data points below which the{" "}
          <span className="text-[#FF6849]">'auto'</span> mode will prefer{" "}
          <span className="text-[#FF6849]">'iqr_trim'</span>.
        </div>
      ),
    },
    {
      name: "skew_threshold",
      type: "float",
      default: <code className="text-[#807F8C]">0.5</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          Absolute skewness threshold above which the{" "}
          <span className="text-[#FF6849]">'auto'</span> mode will prefer{" "}
          <span className="text-[#FF6849]">'winsorize'</span>.
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">false</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          If <span className="text-[#FF6849]">True</span>, a summary of the
          outlier handling process will be printed after fitting.
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
            <div className={`text-sm font-semibold text-[#FF6849]`}>
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

function ImportBlock() {
  return (
    <div className="py-3 self-stretch text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
      <CodeBlock
        title="BASH"
        code="from noventis.data_cleaner import NoventisOutlierHandler"
      />
    </div>
  );
}

function MethodsBlock() {
  return (
    <ul className="list-disc text-base lg:text-lg mt-4 list-outside pl-5 space-y-5 text-[#807F8C] marker:text-[#FF6849] font-openSans">
      <li>
        <p className="font-bold text-[#FF6849]">fit(X)</p>
        <p>
          Analyzes the data and learns the outlier handling configuration from
          the input DataFrame <code>X</code>.
        </p>
      </li>
      <li>
        <p className="font-bold text-[#FF6849]">transform(X)</p>
        <p>
          Applies the learned strategy to <code>X</code> and returns the
          transformed <code>pd.DataFrame</code>.
        </p>
      </li>
      <li>
        <p className="font-bold text-[#FF6849]">fit_transform(X)</p>
        <p>
          Convenience method that performs <code>fit</code> and{" "}
          <code>transform</code> in one step.
        </p>
      </li>
    </ul>
  );
}

function ExamplesIntro() {
  return (
    <div className="my-4 text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
      <CodeBlock title="BASH" code={py} />
    </div>
  );
}

function ModelUsageExamples() {
  return (
    <div className="mt-12 space-y-12">
      {modelExamples.map((s, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start min-w-0"
        >
          <StepOptionCard
            letter={s.letter}
            title={s.title}
            subtitle={s.subtitle}
          />

          <div className="self-start w-full max-w-full overflow-x-auto text-[0.5rem] sm:text-[0.75rem] lg:text-[1rem]">
            <CodeBlock title={s.language} code={s.code} language={s.language} />
          </div>
        </div>
      ))}
    </div>
  );
}
