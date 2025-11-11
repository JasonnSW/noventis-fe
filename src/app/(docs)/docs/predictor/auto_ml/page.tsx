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
        <AutoMLHeader />
        <div className="py-3 self-stretch">
          <CodeBlock
            title="BASH"
            code="from noventis.predictor import NoventisAutoML"
          />
        </div>

        <Divider />

        <Section titleClass="my-2" title="Key Features">
          <AutoMLKeyFeatures />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section titleClass="mb-4" title="Main Workflow Method">
          <AutoMLMainWorkflow />
        </Section>

        <Divider />

        <Section titleClass="mb-4" title="Reporting & Analysis Methods">
          <AutoMLReportingAnalysis />
        </Section>

        <Divider />

        <Section titleClass="mb-2" title="Utility Methods">
          <AutoMLUtilityMethods />
        </Section>

        <Divider />

        <Section titleClass="mb-2" title="Model Usage Examples">
          <h5 className="font-orbitron text-base md:text-lg lg:text-xl text-[#807F8C] my-4">
            Prepare Dataset
          </h5>

          <p className="font-openSans text-sm md:text-base text-[#807F8C] mt-4 mb-2">
            Classification
          </p>
          <CodeBlock title="BASH" code={classificationCode} />

          <p className="font-openSans text-sm md:text-base  text-[#807F8C] mt-4 mb-2">
            Regression
          </p>
          <CodeBlock title="BASH" code={regressionCode} />

          <div className="mt-6 md:mt-8 lg:mt-10 space-y-6">
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
                      <div key={sIdx} className="space-y-5">
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
                              <div key={`code-${iIdx}`} className="self-start">
                                <CodeBlock
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
                                  <div
                                    key={`img-${iIdx}`}
                                    className="self-start"
                                  >
                                    <CodeBlock
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

const classificationCode = dedent(`import pandas as pd
import seaborn as sns
import pandas as pd
from sklearn.datasets import fetch_california_housing
from noventis.predictor import NoventisAutoML

df_titanic = sns.load_dataset('titanic')

df_titanic_clean = df_titanic.drop(columns=['deck', 'embark_town', 'alive'])
df_titanic_clean = df_titanic_clean.dropna()
`);

const regressionCode = dedent(`import pandas as pd
import seaborn as sns
import pandas as pd
from sklearn.datasets import fetch_california_housing
from noventis.predictor import NoventisAutoML

housing = fetch_california_housing()

df_housing = pd.DataFrame(housing.data, columns=housing.feature_names)
df_housing['MedHouseVal'] = housing.target 
`);

export const modelExamples = [
  {
    letter: "01",
    title: <>Example 1: The Full Experience (Default)</>,
    subtitle: (
      <>
        Run AutoML, compare it against a default list of common models, and
        generate a full report.
      </>
    ),
    sections: [
      {
        label: "Classification",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl = NoventisAutoML(data=df_titanic_clean, target='survived', task='classification', time_budget=30)
results = automl.fit()
automl.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-auto-ml-analysis-report-01.svg",
            imageAlt: "Manual Predictor Analysis Report (Classification)",
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-auto-ml-report-01.svg",
            imageAlt: "Noventis AutoML Report (Classification)",
          },
        ],
      },
      {
        label: "Regression",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl = NoventisAutoML(data=df_housing, target='MedHouseVal', task='regression', time_budget=30)
results = automl.fit()
automl.generate_html_report()

`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-auto-ml-analysis-report-01.svg",
            imageAlt: "Manual Predictor Analysis Report (Regression)",
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-auto-ml-report-01.svg",
            imageAlt: "Noventis AutoML Report (Regression)",
          },
        ],
      },
    ],
  },

  {
    letter: "02",
    title: <>Pure AutoML Search</>,
    subtitle: (
      <>
        Focus exclusively on finding the best possible model using the AutoML
        engine within a 5-minute budget.
      </>
    ),
    sections: [
      {
        label: "Classification",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl_pure = NoventisAutoML(
    data=df_titanic_clean,
    target='survived',
    compare=False,
    models=None,
    task='classification',
    time_budget=30,
    metrics='accuracy'
)
results = automl_pure.fit()
automl_pure.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-auto-ml-report-02.svg",
            imageAlt: "Noventis AutoML Report (Classification)",
          },
        ],
      },
      {
        label: "Regression",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl = NoventisAutoML(
    data=df_housing,
    target='MedHouseVal',
    compare=False,
    models=None,
    task='regression',
    time_budget=30,
    metrics='mae'
)
results = automl.fit()
automl.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-auto-ml-report-02.svg",
            imageAlt: "Noventis AutoML Report (Regression)",
          },
        ],
      },
    ],
  },

  {
    letter: "03",
    title: <>Manual Model Training &amp; Comparison</>,
    subtitle: (
      <>
        Train only a specific set of models you want to evaluate, without
        running the AutoML search.
      </>
    ),
    sections: [
      {
        label: "Classification",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl_pure = NoventisAutoML(
    data=df_titanic_clean,
    target='survived',
    compare=False,
    models=['random_forest', 'lightgbm', 'logistic_regression'],
    task='classification'
)
results = automl_pure.fit()
automl_pure.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-auto-ml-report-03.svg",
            imageAlt: "Noventis AutoML Report (Classification)",
          },
        ],
      },
      {
        label: "Regression",
        items: [
          {
            title: "BASH",
            language: "bash",
            code: dedent(`
automl = NoventisAutoML(
    data=df_housing,
    target='MedHouseVal',
    compare=False,
    models=['linear_regression', 'random_forest', 'xgboost'],
    task='regression'
)
results = automl.fit()
automl.generate_html_report()
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-auto-ml-report-03.svg",
            imageAlt: "Noventis AutoML Report (Regression)",
          },
        ],
      },
    ],
  },
  {
    letter: "04",
    title: <>Loading a Saved Model and Predicting</>,
    subtitle: (
      <>
        Train a model, then load the saved best model and use it to predict on
        new data.
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
from noventis.predictor import NoventisAutoML
import pandas as pd

# First, run the training process
automl = NoventisAutoML(
    data='path/to/train_data.csv',
    target='YourTargetColumn'
)
automl.fit()

# Now, load new data for prediction
new_data = pd.read_csv('path/to/new_unseen_data.csv')

# Use the predict method (it automatically finds the best saved model)
predictions = automl.predict(
    X_new=new_data,
    model_path='Noventis_Results/best_model.pkl'
)

print(predictions)
`),
          },
        ],
      },
    ],
  },
];

function AutoMLHeader() {
  return (
    <>
      <div className="text-[#FF6849] font-orbitron text-base leading-normal uppercase">
        DATA_CLEANER
      </div>
      <h3 className="text-white text-4xl font-orbitron font-medium leading-normal">
        NoventisAutoML
      </h3>
      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        The journey from a prepared dataset to a high-performing, deployable
        machine learning model involves numerous steps: model selection,
        hyperparameter tuning, rigorous evaluation, and comparison.{" "}
        <code className="text-[#FF6849] font-firaCode">NoventisAutoML</code> is
        an all-in-one solution designed to automate this entire workflow. It
        acts as your personal automated data scientist, exploring various
        models, optimizing their performance within a set budget, and delivering
        a comprehensive, interactive report with actionable insights. for normal
        data, RobustScaler for data with outliers, or PowerTransformer for
        skewed data—is often a tedious manual process.
      </p>
      <p className="text-[#807F8C] mt-2 font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        Powered by the robust FLAML library, it can find the best model through
        an efficient AutoML search, train a specific list of models you define,
        or do both and compare them head-to-head to find the undisputed champion
        for your dataset.
      </p>
    </>
  );
}

function AutoMLKeyFeatures() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Hybrid Modeling Approach</p>
        <p>
          Seamlessly run a state-of-the-art AutoML search, train a specific list
          of manual models (like{" "}
          <code className="font-firaCode text-[#FF6849]">
            {" "}
            xgboost, random_forest,
          </code>
          etc.), or do both simultaneously and compare them to find the absolute
          best performer.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Fully Automated Workflow</p>
        <p>
          Handles data loading (from CSV or DataFrame), automatic task detection
          (classification/regression), and stratified train-test splitting.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          Rich Explainability & Visualization
        </p>
        <p>
          When{" "}
          <code className="font-firaCode text-[#FF6849]">explain=True</code>,
          automatically generates a suite of insightful plots including feature
          importance, confusion matrices, ROC/AUC & Precision-Recall curves,
          residual plots, and more. .
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">Interactive HTML Reporting</p>
        <p>
          Produces a stunning, self-contained HTML dashboard that consolidates
          all results, performance metrics, model comparisons, and plots into a
          single, user-friendly, and shareable file.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          Rich Explainability & Visualization
        </p>
        <p>
          Automatically saves the best-performing model as a .pkl file, ready
          for easy loading and deployment for future predictions.
        </p>
      </li>
    </ul>
  );
}

function AutoMLMainWorkflow() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .fit(time_budget=60, metric=None) → dict
        </p>
        <p>
          This is the primary method to execute the entire AutoML pipeline. It
          orchestrates data splitting, model training (AutoML and/or manual),
          evaluation, comparison, and saving the best model. It returns a
          dictionary containing all detailed results from the run. The{" "}
          <code className="font-firaCode text-[#FF6849]">time_budget</code> and{" "}
          <code className="font-firaCode text-[#FF6849]"> metric </code>{" "}
          parameters can be used here to override the values set during
          initialization.
        </p>
      </li>
    </ul>
  );
}

function AutoMLReportingAnalysis() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .generate_html_report() → HTML
        </p>
        <p>
          Generates the comprehensive, interactive HTML report of the entire
          process. In Jupyter environments, this report is often displayed
          automatically after{" "}
          <code className="font-firaCode text-[#FF6849]">.fit()</code>{" "}
          completes.
        </p>
      </li>
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">.get_model_info() → dict</p>
        <p>
          Returns a dictionary with details about the best-found model,
          including the final estimator, its configuration, and feature names.
        </p>
      </li>
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">.export_results_to_csv()</p>
        <p>
          Saves key results—including predictions on the test set, performance
          metrics, and feature importances—to CSV files in the output_dir for
          external analysis.
        </p>
      </li>
    </ul>
  );
}

function AutoMLUtilityMethods() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .predict(X_new, model_path=None)
        </p>
        <p>
          Makes predictions on new, unseen data (X_new). It can either use the
          model trained in the current session or load a previously saved model
          from a file specified by{" "}
          <code className="font-firaCode text-[#FF6849]">model_path</code>.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .load_model(model_path) → object
        </p>
        <p>
          A utility function to load a saved{" "}
          <code className="font-firaCode text-[#FF6849]">.pkl</code> model from
          the specified path.
        </p>
      </li>
    </ul>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "data",
      type: "Union[str, pd.DataFrame]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The input data. This can be either a pandas DataFrame or a string
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
          The name of the target variable (the column you want to predict).
        </div>
      ),
      accent: true,
    },
    {
      name: "task",
      type: "Optional[str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The type of machine learning task. Can be{" "}
          <code className="text-[#FF6849] font-firaCode">'classification'</code>{" "}
          or <code className="text-[#FF6849] font-firaCode">'regression'</code>.
          If <code className="text-[#FF6849] font-firaCode">None</code>, the
          task will be automatically inferred from the target column's data type
          and distribution.
        </div>
      ),
    },
    {
      name: "models",
      type: "List[str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-2">
          <p>
            A list of model names to train manually and compare. If{" "}
            <code className="text-[#FF6849] font-firaCode">None</code> and{" "}
            <code className="text-[#FF6849] font-firaCode">compare=True</code>,
            a default list of common models will be used. This parameter is
            ignored if{" "}
            <code className="text-[#FF6849] font-firaCode">compare=False</code>{" "}
            and you are only running the AutoML engine.
          </p>
          <div className="space-y-1">
            <div>
              • Classification examples:{" "}
              <code className="text-[#FF6849] font-firaCode">
                'logistic_regression'
              </code>
              ,{" "}
              <code className="text-[#FF6849] font-firaCode">
                'random_forest'
              </code>
              , <code className="text-[#FF6849] font-firaCode">'xgboost'</code>,{" "}
              <code className="text-[#FF6849] font-firaCode">'lightgbm'</code>.
            </div>
            <div>
              • Regression examples:{" "}
              <code className="text-[#FF6849] font-firaCode">
                'linear_regression'
              </code>
              ,{" "}
              <code className="text-[#FF6849] font-firaCode">
                'random_forest'
              </code>
              , <code className="text-[#FF6849] font-firaCode">'xgboost'</code>.
            </div>
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "explain",
      type: "bool",
      default: <code className="text-[#807F8C]">True</code>,
      desc: (
        <div className="text-[#807F8C]">
          generates all performance visualizations and saves them to the{" "}
          <code className="text-[#FF6849] font-firaCode">output_dir</code>.
        </div>
      ),
      accent: true,
    },
    {
      name: "compare",
      type: "bool",
      default: <code className="text-[#807F8C]">True</code>,
      desc: (
        <div className="text-[#807F8C] space-y-1">
          <p>Controls the operating mode.</p>
          <div>
            • If <code className="text-[#FF6849] font-firaCode">True</code>{" "}
            (default), the tool will run the AutoML engine and train the{" "}
            <code className="text-[#FF6849] font-firaCode">models</code>{" "}
            specified in{" "}
            <code className="text-[#FF6849] font-firaCode">models</code>, then
            compare all of them to find the best one.
          </div>
          <div>
            • If <code className="text-[#FF6849] font-firaCode">False</code>, it
            will only run one of the two modes: either AutoML (if{" "}
            <code className="text-[#FF6849] font-firaCode">models</code> is{" "}
            <code className="text-[#FF6849] font-firaCode">None</code>) or the
            manual list of models (if{" "}
            <code className="text-[#FF6849] font-firaCode">models</code> is
            provided).
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "metrics",
      type: "str",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C] space-y-1">
          <p>
            The primary metric to use for optimization and model ranking. If{" "}
            <code className="text-[#FF6849] font-firaCode">None</code>, it
            defaults to{" "}
            <code className="text-[#FF6849] font-firaCode">'macro_f1'</code> for
            classification and{" "}
            <code className="text-[#FF6849] font-firaCode">'r2'</code> for
            regression.
          </p>
          <div>
            • Classification examples:{" "}
            <code className="text-[#FF6849] font-firaCode">'accuracy'</code>,{" "}
            <code className="text-[#FF6849] font-firaCode">'precision'</code>,{" "}
            <code className="text-[#FF6849] font-firaCode">'recall'</code>,{" "}
            <code className="text-[#FF6849] font-firaCode">'f1_score'</code>.
          </div>
          <div>
            • Regression examples:{" "}
            <code className="text-[#FF6849] font-firaCode">'r2_score'</code>,{" "}
            <code className="text-[#FF6849] font-firaCode">'mae'</code>,{" "}
            <code className="text-[#FF6849] font-firaCode">'mse'</code>.
          </div>
        </div>
      ),
      accent: true,
    },
    {
      name: "time_budget",
      type: "int",
      default: <code className="text-[#807F8C]">60</code>,
      desc: (
        <div className="text-[#807F8C]">
          The total time in seconds allocated to the AutoML engine for its
          search process. A larger budget allows for a more thorough search.
        </div>
      ),
      accent: true,
    },
    {
      name: "output_dir",
      type: "str",
      default: <code className="text-[#807F8C]">'Noventis_Results'</code>,
      desc: (
        <div className="text-[#807F8C]">
          The directory where all outputs (saved models, plots, reports) will be
          stored.
        </div>
      ),
      accent: true,
    },
    {
      name: "test_size",
      type: "float",
      default: <code className="text-[#807F8C]">0.2</code>,
      desc: (
        <div className="text-[#807F8C]">
          The proportion of the dataset to allocate to the test set.
        </div>
      ),
      accent: true,
    },
    {
      name: "random_state",
      type: "int",
      default: <code className="text-[#807F8C]">42</code>,
      desc: (
        <div className="text-[#807F8C]">
          The random seed for ensuring reproducibility in data splitting and
          model training.
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
            <div className={`text-sm font-semibold ${"text-[#FF6849]"}`}>
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
