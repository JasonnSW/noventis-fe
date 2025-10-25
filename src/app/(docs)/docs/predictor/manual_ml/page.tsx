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
        <ManualMLHeader />

        <div className="py-3 self-stretch">
          <CodeBlock
            title="BASH"
            code="from noventis.predictor import NoventisManualML"
          />
        </div>

        <Divider />

        <Section titleClass="my-2" title="Key Features">
          <KeyFeatures />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Parameters">
          <DocsParameter />
        </Section>

        <Divider />

        <Section titleClass="my-4" title="Main Workflow Method">
          <MainWorkflowMethod />
        </Section>

        <Divider />

        <Section titleClass="my-4" title="Reporting & Analysis Methods">
          <ReportingAnalysisMethods />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Utility Methods">
          <UtilityMethods />
        </Section>

        <Divider />

        <Section titleClass="my-2" title="Model Usage Examples">
          <h5 className="font-orbitron text-base md:text-lg lg:text-xl text-[#807F8C] my-4">
            Prepare Dataset
          </h5>

          <p className="font-openSans text-sm md:text-base text-[#807F8C] mt-4 mb-2">
            Classification
          </p>
          <CodeBlock title="BASH" code={classificationCode} />

          <p className="font-openSans text-sm md:text-base text-[#807F8C] mt-4 mb-2">
            Regression
          </p>
          <CodeBlock title="BASH" code={regressionCode} />

          <div className="mt-12 md:mt-14 lg:mt-16 space-y-12">
            {modelExamples.map((ex, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start"
              >
                <StepOptionCard
                  letter={ex.letter}
                  title={ex.title}
                  subtitle={ex.subtitle}
                />

                <div className="self-start space-y-8">
                  {ex.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <p className="font-openSans text-[#807F8C]">
                        {section.label}
                      </p>

                      {section.items.map((item, iIdx) => (
                        <CodeBlock
                          key={iIdx}
                          title={item.title}
                          code={item.code}
                          language={item.language}
                          imageSrc={item.imageSrc}
                          imageAlt={item.imageAlt}
                        />
                      ))}
                    </div>
                  ))}
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
        Demonstrates how to train and compare a specified list of models using
        their default parameters, leveraging the integrated data cleaner for
        preprocessing.
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
manualml = NoventisManualML(
    model_name=['logistic_regression', 'random_forest', 'lightgbm'],
    task='classification',
)
results = manualml.fit(
    df=df_titanic_clean,
    target_column='survived',
    use_data_cleaner=True
)
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-manual-01.svg",
            imageAlt: "Noventis classification manual report 01",
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
manualml = NoventisManualML(
    model_name=['linear_regression', 'random_forest', 'lightgbm'],
    task='regression',           
)
results = manualml.fit(
    df=df_housing,
    target_column='MedHouseVal',
    use_data_cleaner=True
)
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-manual-01.svg",
            imageAlt: "Noventis regression manual 01",
          },
        ],
      },
    ],
  },

  {
    letter: "02",
    title: <>Example 2: ManualML With Hyperparameter tunning</>,
    subtitle: (
      <>
        Showcases how to enable Optuna-based hyperparameter tuning for a single
        model to find its optimal configuration, along with displaying tuning
        plots.
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
manualml_tunning =NoventisManualML(
    model_name='xgboost',
    task='classification',
    tune_hyperparameters=True,  
    n_trials=50,                
    cv_folds=5,                 
    show_tuning_plots=True,     
    random_state=42
)
results = manualml_tunning.fit(
    df=df_titanic_clean,
    target_column='survived',
    display_report=True,
    compare=True,
    explain=True,
    use_data_cleaner=True
)
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-classification-manual-02.svg",
            imageAlt: "Noventis classification manual report 02",
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
manualml = NoventisManualML(
    model_name='xgboost',
    task='regression',
    tune_hyperparameters=True,  
    n_trials=50,             
    cv_folds=5,               
    show_tuning_plots=True,     
    random_state=42
)
results = manualml.fit(
    df=df_housing,
    target_column='MedHouseVal',
    display_report=True,
    compare=True,
    explain=True,
    use_data_cleaner=True
)
`),
          },
          {
            title: "RESULT",
            imageSrc: "/noventis-regression-manual-02.svg",
            imageAlt: "Noventis regression manual 02",
          },
        ],
      },
    ],
  },

  {
    letter: "03",
    title: <>Example 3: Save and use your model</>,
    subtitle: (
      <>
        This demonstrates the practical workflow of saving the best model found
        during the pipeline run and then loading it back for future use,
        simulating deployment.
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
manualml .save_model(filepath='best_xgboost_model.pkl')
loaded_model = NoventisManualML.load_model(filepath='best_xgboost_model.pkl')
print(f"Model {type(loaded_model)} successfully loaded.")
`),
          },
        ],
      },
    ],
  },
];

function ManualMLHeader() {
  return (
    <>
      <div className="text-[#FF6849] font-orbitron text-sm md:text-base leading-normal uppercase">
        DATA_CLEANER
      </div>

      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-orbitron font-medium leading-normal">
        NoventisManualML
      </h3>

      <p className="text-[#807F8C] font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        While AutoML provides a powerful, hands-off approach, expert users often
        require granular control over model selection, hyperparameter tuning,
        and in-depth analysis. The{" "}
        <code className="font-firaCode text-[#FF6849]">NoventisManualML</code>{" "}
        is designed precisely for this purpose. It serves as a comprehensive
        toolkit for building, tuning, comparing, and explaining a user-defined
        set of machine learning models.
      </p>

      <p className="text-[#807F8C] mt-2 font-normal font-openSans text-base lg:text-lg text-justify leading-normal">
        Leveraging advanced libraries like{" "}
        <code className="font-firaCode text-[#FF6849]">Optuna</code> for
        hyperparameter optimization and{" "}
        <code className="font-firaCode text-[#FF6849]">SHAP</code> for
        explainability, it provides a structured and powerful environment for
        deliberate and insightful machine learning experimentation. It is the
        ideal tool when you want to compare specific algorithms or dive deep
        into the behavior of a single, highly-tuned model.
      </p>
    </>
  );
}

function DocsParameter() {
  const params = [
    {
      name: "model_name",
      type: "Union[str, List[str]]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The core parameter defining the experiment. Provide a single model
          name as a string (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">'xgboost'</code>) or a
          list of names to train and compare (e.g.,{" "}
          <code className="text-[#FF6849] font-firaCode">
            ['random_forest', 'lightgbm']
          </code>
          ).
        </div>
      ),
      accent: true,
    },
    {
      name: "task",
      type: "str",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          The machine learning task. Must be either{" "}
          <code className="text-[#FF6849] font-firaCode">'classification'</code>{" "}
          or <code className="text-[#FF6849] font-firaCode">'regression'</code>.
        </div>
      ),
      accent: true,
    },
    {
      name: "tune_hyperparameters",
      type: "bool",
      default: <code className="text-[#807F8C]">False</code>,
      desc: (
        <div className="text-[#807F8C]">
          If True, enables hyperparameter optimization for each model using
          Optuna. If False, models are trained with their default parameters.
        </div>
      ),
      accent: true,
    },
    {
      name: "n_trials",
      type: "int",
      default: <code className="text-[#807F8C]">50</code>,
      desc: (
        <div className="text-[#807F8C]">
          The number of optimization trials to run per model when{" "}
          <code className="text-[#FF6849] font-firaCode">
            tune_hyperparameters
          </code>{" "}
          is True.
        </div>
      ),
    },
    {
      name: "data_cleaner",
      type: "Optional[NoventisDataCleaner]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          An optional, pre-configured{" "}
          <code className="text-[#FF6849] font-firaCode">
            NoventisDataCleaner
          </code>{" "}
          instance. If provided, its cleaning pipeline will be applied to the
          data before training.
        </div>
      ),
      accent: true,
    },
    {
      name: "cv_folds",
      type: "int",
      default: <code className="text-[#807F8C]">3</code>,
      desc: (
        <div className="text-[#807F8C]">
          The number of cross-validation folds to use during the hyperparameter
          tuning process.
        </div>
      ),
    },
    {
      name: "cv_strategy",
      type: "str",
      default: <code className="text-[#807F8C]">'repeated'</code>,
      desc: (
        <div className="text-[#807F8C]">
          The cross-validation strategy for tuning classification models. Can be{" "}
          <code className="text-[#FF6849] font-firaCode">'repeated'</code> (uses{" "}
          <code className="text-[#FF6849] font-firaCode">
            RepeatedStratifiedKFold
          </code>
          ) or another value (uses{" "}
          <code className="text-[#FF6849] font-firaCode">StratifiedKFold</code>
          ).
        </div>
      ),
      accent: true,
    },
    {
      name: "show_tuning_plots",
      type: "bool",
      default: <code className="text-[#807F8C]">False</code>,
      desc: (
        <div className="text-[#807F8C]">
          If True and{" "}
          <code className="text-[#FF6849] font-firaCode">
            tune_hyperparameters
          </code>{" "}
          is enabled, displays Optuna's optimization history and parameter
          importance plots during the run.
        </div>
      ),
    },
    {
      name: "output_dir",
      type: "Optional[str]",
      default: <code className="text-[#807F8C]">None</code>,
      desc: (
        <div className="text-[#807F8C]">
          A directory path where all artifacts (saved models, plots, reports)
          will be stored. If provided, a unique sub-folder is created for each
          run.
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

      <div className="md:hidden space-y-5">
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

function KeyFeatures() {
  const features = [
    {
      title: "Custom Model Suite",
      description: (
        <>
          Train and compare one or more specific models from a comprehensive
          list, including{" "}
          <code className="font-firaCode text-[#FF6849]">
            LogisticRegression, RandomForest, XGBoost, LightGBM
          </code>{" "}
          , and more.
        </>
      ),
    },
    {
      title: "Advanced Hyperparameter Tuning",
      description: (
        <>
          Integrates <b>Optuna</b> to perform sophisticated, state-of-the-art
          hyperparameter optimization, helping you squeeze maximum performance
          out of each model.
        </>
      ),
    },
    {
      title: "Deep Model Explainability",
      description: (
        <>
          Incorporates <b>SHAP</b> to provide deep, model-agnostic insights into
          how your model makes predictions, generating summary, beeswarm, and
          dependence plots.
        </>
      ),
    },
    {
      title: "Flexible Preprocessing",
      description: (
        <>
          Includes a robust internal preprocessor for handling missing values
          and categorical features, and can optionally be chained with a
          pre-configured{" "}
          <code className="font-firaCode text-[#FF6849]">
            NoventisDataCleaner
          </code>{" "}
          instance for more complex cleaning pipelines.
        </>
      ),
    },
    {
      title: "Comprehensive Reporting",
      description: (
        <>
          Generates a detailed, interactive HTML report that consolidates
          performance metrics, model comparisons, evaluation plots, and feature
          importance into a single, easy-to-navigate dashboard.
        </>
      ),
    },
  ];

  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      {features.map((f, idx) => (
        <li key={idx} className="marker:text-[#FF6849]">
          <p className="font-bold text-[#FF6849]">{f.title}</p>
          <p>{f.description}</p>
        </li>
      ))}
    </ul>
  );
}

function MainWorkflowMethod() {
  return (
    <ul className="list-disc text-base md:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .fit(df, target_column, test_size=0.2, compare=False, explain=False,
          display_report=True)
        </p>
        <p className="text-[#807F8C] mt-1">
          This is the primary method to execute the entire workflow. It
          orchestrates data splitting, preprocessing, model training (and
          optional tuning), evaluation, and reporting. It's the main entry point
          for using the{" "}
          <code className="font-firaCode text-[#FF6849]">ManualPredictor</code>.
        </p>

        <ul className="list-disc list-outside pl-6 mt-4 space-y-1">
          <li>
            df (
            <code className="font-firaCode text-[#FF6849]">pd.DataFrame</code>):
            The full dataset including the target column.
          </li>
          <li>
            target_column (
            <code className="font-firaCode text-[#FF6849]">str</code>): The name
            of the column to be predicted.
          </li>
          <li>
            test_size (
            <code className="font-firaCode text-[#FF6849]">float</code>): The
            proportion of data to hold out for testing.
          </li>
          <li>
            compare (<code className="font-firaCode text-[#FF6849]">bool</code>
            ): If True, prints a summary table comparing all trained models.
          </li>
          <li>
            explain (<code className="font-firaCode text-[#FF6849]">bool</code>
            ): If True, generates a bar plot comparing model performance.
          </li>
          <li>
            display_report (
            <code className="font-firaCode text-[#FF6849]">bool</code>): If
            True, automatically displays the final HTML report in the output
            cell (in Jupyter environments).
          </li>
        </ul>
      </li>
    </ul>
  );
}

function ReportingAnalysisMethods() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#807F8C] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .generate_html_report(filepath=None) → str
        </p>
        <p className="text-[#A9AABC] mt-1">
          Creates the comprehensive HTML report, which includes an execution
          summary, a detailed model comparison table, and all generated
          visualizations. The report can be saved to a file if a{" "}
          <code className="font-firaCode text-[#FF6849]">filepath</code> is
          provided.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">.display_report()</p>
        <p className="text-[#A9AABC] mt-1">
          A convenience method to display the generated HTML report directly in
          a Jupyter or Google Colab output cell.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .explain_model(plot_type='summary', feature=None)
        </p>
        <p className="text-[#A9AABC] mt-1">
          Provides deep model explainability for the best-performing model using{" "}
          <b>SHAP</b>. It can generate different visualizations to understand
          feature impacts on the model's predictions.
        </p>

        <ul className="list-disc list-outside pl-6 mt-3 space-y-1">
          <li>
            <b className="text-[#807F8C]">plot_type</b>:{" "}
            <code className="font-firaCode text-[#FF6849]">'summary'</code>{" "}
            (default),{" "}
            <code className="font-firaCode text-[#FF6849]">'beeswarm'</code>, or{" "}
            <code className="font-firaCode text-[#FF6849]">'dependence'</code>.
          </li>
          <li>
            <b className="text-[#807F8C]">feature</b>: The name of a feature is
            required for the{" "}
            <code className="font-firaCode text-[#FF6849]">'dependence'</code>{" "}
            plot.
          </li>
        </ul>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .get_results_dataframe() → pd.DataFrame
        </p>
        <p className="text-[#A9AABC] mt-1">
          Returns a clean pandas DataFrame containing the performance metrics
          for all successfully trained models, sorted by the primary evaluation
          metric.
        </p>
      </li>
    </ul>
  );
}

function UtilityMethods() {
  return (
    <ul className="list-disc text-base lg:text-lg list-outside pl-5 space-y-6 text-[#A9AABC] font-openSans">
      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">.save_model(filepath=None)</p>
        <p className="text-[#A9AABC] mt-1">
          Saves the best-performing model from the pipeline run to a{" "}
          <code className="font-firaCode text-[#FF6849]">.pkl</code> file for
          later use. If{" "}
          <code className="font-firaCode text-[#FF6849]">filepath</code> is not
          provided, it saves to the{" "}
          <code className="font-firaCode text-[#FF6849]">output_dir</code>.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .load_model(filepath) → object
        </p>
        <p className="text-[#A9AABC] mt-1">
          A utility function to load a saved{" "}
          <code className="font-firaCode text-[#FF6849]">.pkl</code> model from
          the specified path.
        </p>
      </li>

      <li className="marker:text-[#FF6849]">
        <p className="font-bold text-[#FF6849]">
          .predict(X_new, model_path=None)
        </p>
        <p className="text-[#A9AABC] mt-1">
          Makes predictions on new data using either the best model from the
          session or a loaded model from a file.
        </p>
      </li>
    </ul>
  );
}
