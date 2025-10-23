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
        <Header />

        <div className="py-3 self-stretch">
          <CodeBlock
            title="BASH"
            code="from noventis.data_cleaner import NoventisScaler"
          />
        </div>

        <Divider />

        <Section titleClass="my-2" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Methods">
          <MethodsContent />
        </Section>
        <Divider />

        <Section title="Model Usage Examples">
          <ModelUsageExamples />
        </Section>
      </div>
    </section>
  );
}

const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: Automatic Scaling</>,
    subtitle: (
      <>
        This is the most powerful feature of{" "}
        <code className="font-firaCode text-[#FF6849]">NoventisScaler</code>.
        We'll let it analyze each column of our diverse dataset and apply the
        most appropriate scaling strategy. Using{" "}
        <code className="font-firaCode text-[#FF6849]">verbose=True </code>will
        show us the decisions it made.
      </>
    ),
    language: "BASH",
    code: dedent(`
import pandas as pd
import numpy as np
from noventis_scaler import NoventisScaler

# Create a diverse sample dataset
df = pd.DataFrame({
    'normal_data': np.random.normal(loc=100, scale=15, size=500),
    'skewed_data': np.random.gamma(shape=1, scale=50, size=500)**2,
    'data_with_outliers': np.concatenate([np.random.normal(loc=0, scale=5, size=496), 
                                          np.array([-50, 50, -60, 60])]),
    'bimodal_data': np.concatenate([np.random.normal(loc=20, scale=5, size=250), 
                                    np.random.normal(loc=80, scale=7, size=250)])
})

# Initialize in 'auto' mode to let the scaler decide
scaler = NoventisScaler(method='auto', verbose=True)

# Fit and transform the data
df_scaled = scaler.fit_transform(df)

# Check which method was chosen for each column
print("\\nScaler chosen for each column:")
print(scaler.fitted_methods_)
`),
  },
  {
    letter: "02",
    title: <>Example 2: Force Specific Method</>,
    subtitle: (
      <>
        Sometimes, you might want to apply a single scaling strategy to all
        columns, overriding the automatic selection. Here, we'll force every
        column to use{" "}
        <code className="font-firaCode text-[#FF6849]">RobustScaler</code>.
      </>
    ),
    language: "BASH",
    code: dedent(`
# Initialize with the 'robust' method
scaler_robust = NoventisScaler(method='robust')

# Fit and transform the data
df_robust_scaled = scaler_robust.fit_transform(df)

print("\\nDescription of data after forcing RobustScaler on all columns:")
print(df_robust_scaled.describe())
`),
  },
  {
    letter: "03",
    title: <>Example 3: Advanced Usage with custom_params</>,
    subtitle: (
      <>
        You can get even more granular control by passing custom parameters to
        the underlying scalers. Here, we will use{" "}
        <code className="font-firaCode text-[#FF6849]"> PowerTransformer </code>{" "}
        on all columns but disable its default behavior of standardizing the
        output (setting mean=0, std=1).
      </>
    ),
    language: "BASH",
    code: dedent(`
# Define a custom parameter to override the default
# We want the PowerTransformer to transform the data but not standardize it
custom_config = {'power': {'standardize': False}}

# Initialize with the 'power' method and our custom parameters
scaler_custom = NoventisScaler(method='power', custom_params=custom_config)

# Fit and transform
df_custom_scaled = scaler_custom.fit_transform(df)

print("\\nDescription of data after custom PowerTransformer:")
print(df_custom_scaled.describe())
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
        NoventisScaler
      </h3>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        Feature scaling is a crucial preprocessing step that ensures all
        numerical features have a comparable scale. This can dramatically
        improve the performance of many machine learning models. However,
        choosing the right scaler—{" "}
        <code className="text-[#FF6849] font-firaCode">StandardScaler</code> for
        normal data,{" "}
        <code className="text-[#FF6849] font-firaCode">RobustScaler</code> for
        data with outliers, or{" "}
        <code className="text-[#FF6849] font-firaCode">PowerTransformer</code>{" "}
        for skewed data—is often a tedious manual process.
      </p>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        <span className="text-[#FF6849] font-firaCode">NoventisScaler</span> is
        here to automate this process. It intelligently analyzes each numerical
        column in your dataset and applies the most suitable scaling strategy,
        ensuring each feature is treated optimally.
      </p>
    </>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "method",
      type: "{'auto', 'standard', 'minmax', 'robust', 'power'}",
      default: (
        <code className="text-[#807F8C] inline">
          'auto' The scaling algorithm to be used.
        </code>
      ),
      desc: (
        <div className="text-[#807F8C] space-y-2 leading-relaxed">
          <ul className="list-disc list-outside pl-5 space-y-4 marker:text-[#FF6849]">
            <li>
              <code className="text-[#FF6849] font-firaCode">'auto'</code>{" "}
              <span className="text-[#FF6849] font-firaCode">(default): </span>{" "}
              Automatically selects the best scaling strategy for each column
              based on its statistical properties (skewness, outliers, etc.).
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'standard'</code>:
              Uses StandardScaler. Best for data that is already normally
              distributed (or close to it). Scales data to have a mean of 0 and
              a standard deviation of 1.
            </li>
            <li>
              <code className="text-[#FF6849] font-firaCode">'minmax'</code>:
              Uses MinMaxScaler. Scales data to a fixed range, typically [0, 1].
              Useful for algorithms that require feature values in a specific
              range, like neural networks.
            </li>
            <li>
              <code className="text-[#FF6849] font-openSans">'robust'</code>:
              Uses RobustScaler. This method is great for datasets with
              significant outliers, as it scales data based on the median and
              interquartile range (IQR).
            </li>
            <li>
              <code className="text-[#FF6849] font-openSans">'power'</code>:
              Uses PowerTransformer. This is a powerful technique to transform
              skewed data to be more Gaussian (normal-like).
            </li>
          </ul>

          <div className="pt-1">
            <b className="text-[#FF6849]">How does method='auto' work?</b>
            <p>
              When method is set to 'auto', NoventisScaler evaluates each column
              using a prioritized decision hierarchy to select the most
              appropriate scaler:
            </p>
          </div>

          <ol className="list-decimal list-outside pl-5 space-y-4 marker:text-[#FF6849]">
            <li>
              <span className="text-[#FF6849] font-openSans">
                Forced for KNN?
              </span>{" "}
              : If is_for_knn=True is passed to the .fit() method, MinMaxScaler
              is used.
            </li>
            <li>
              <span className="text-[#FF6849] font-openSans">
                High cardinality (&gt;50)
              </span>{" "}
              : If the column's absolute skewness is greater than skew_threshold
              (default: 2.0), PowerTransformer is used to make the data more
              Gaussian-like.
            </li>
            <li>
              <span className="text-[#FF6849] font-openSans">
                Significant Outliers?
              </span>{" "}
              : If the ratio of outliers exceeds outlier_threshold (default:
              0.01) , the outlier-resistant RobustScaler is chosen.
            </li>
            <li>
              <span className="text-[#FF6849] font-openSans">
                Normally Distributed?
              </span>{" "}
              : If the data passes a normality test (using normality_alpha as
              the significance level), the standard StandardScaler is applied.
            </li>
            <li>
              <span className="text-[#FF6849] font-openSans">
                Default Fallback
              </span>{" "}
              : If the data passes a normality test (using normality_alpha as
              the significance level), the standard StandardScaler is applied
            </li>
          </ol>
        </div>
      ),
      accent: true,
    },
    {
      name: "optimize",
      type: "bool",
      default: <code className="text-[#807F8C]">True</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          If <code className="text-[#FF6849] font-firaCode">True</code>, the
          scaler's internal parameters will be fine-tuned.
        </div>
      ),
    },
    {
      name: "custom_params",
      type: "Optional[dict]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          Allows you to override the default or optimized parameters for
          specific scaling methods.
        </div>
      ),
    },
    {
      name: "skew_threshold",
      type: "float",
      default: <code className="text-[#807F8C]">2.0</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          Threshold of absolute skewness to consider a column as "highly
          skewed".
        </div>
      ),
    },
    {
      name: "outlier_threshold",
      type: "float",
      default: <code className="text-[#807F8C]">'0.01'</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The proportion of data points that must be outliers for a column to be
          categorized as "having outliers".
        </div>
      ),
    },
    {
      name: "normality_alpha",
      type: "float",
      default: <code className="text-[#807F8C]">'0.05'</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          The significance level (alpha) used in the statistical test for
          normality.
        </div>
      ),
    },
    {
      name: "verbose",
      type: "bool",
      default: <code className="text-[#807F8C]">false</code>,
      desc: (
        <div className="text-[#807F8C] leading-relaxed">
          If True, a summary of the scaling process will be printed after
          fitting.
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
            <col className="w-auto" />
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
                  className={`font-semibold text-sm text-[#FF6849]`}
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
            <div className={`text-sm font-semibold text-[#FF6849]`}>
              {p.name}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300">
              <div className="opacity-70">Type</div>
              <div className="text-right break-words">{p.type}</div>
              <div className="opacity-70">Default</div>
              <div className="text-right">{p.default}</div>
            </div>

            <div className="mt-3 text-xs md:text-sm text-gray-300">
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MethodsContent() {
  return (
    <ul className="list-disc list-outside text-base lg:text-lg pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849] ">
          fit(X, is_for_knn=False) → returns self
        </p>
        <p>Analyze data and fit scalers for each column.</p>

        <div className="mt-1">
          <p className="font-bold">Parameters:</p>
          <ul className="list-disc pl-6 text-[#807F8C] space-y-1 [&>li]:marker:text-[#807F8C]">
            <li>
              <code>X</code> (<code>pd.DataFrame</code>): Input dataframe.
            </li>
            <li>
              <code>is_for_knn</code> (<code>bool</code>): Force MinMax scaling
              for KNN algorithms.
            </li>
          </ul>
        </div>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          transform(X) → Returns: pd.DataFrame (scaled data)
        </p>
        <p>Apply fitted scalers to transform data.</p>
        <div className="mt-1">
          <p className="font-bold">Parameters:</p>
          <ul className="list-disc pl-6 text-[#807F8C] space-y-1 [&>li]:marker:text-[#807F8C]">
            <li>
              <code>X</code> (<code>pd.DataFrame</code>): Input dataframe.
            </li>
          </ul>
        </div>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          fit_transform(X, is_for_knn=False) → Returns: pd.DataFrame
        </p>
        <p>Fit and transform in one step.</p>
        <div className="mt-1">
          <p className="font-bold">Parameters:</p>
          <ul className="list-disc pl-6 text-[#807F8C] space-y-1 [&>li]:marker:text-[#807F8C]">
            <li>
              <code>X</code> (<code>pd.DataFrame</code>): Input dataframe.
            </li>
            <li>
              <code>is_for_knn</code> (<code>bool</code>): Force MinMax scaling
              for KNN algorithms.
            </li>
          </ul>
        </div>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          inverse_transform(X) → Returns: pd.DataFrame
        </p>
        <p>Reverse transformation to the original scale.</p>
        <div className="mt-1">
          <p className="font-bold">Parameters:</p>
          <ul className="list-disc pl-6 text-[#807F8C] space-y-1 [&>li]:marker:text-[#807F8C]">
            <li>
              <code>X</code> (<code>pd.DataFrame</code>): Scaled dataframe.
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
}

function ModelUsageExamples() {
  return (
    <div className="mt-8 md:mt-12 space-y-10">
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
