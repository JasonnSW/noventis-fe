import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Divider } from "@/components/divider";
import { cls, Section } from "@/components/section";

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto my-4">
      <div className="flex flex-col space-y-3">
        <Header />

        <Divider />

        <Section
          title="Step 1: Setup & Load Sample Data"
          description={`First, let's import all the tools we'll need from the Noventis library. We'll also create a sample DataFrame that has several common issues: missing data (NaN), categorical features, a potential outlier, and a binary target to predict.`}
        >
          <Step1Setup />
        </Section>

        <Divider />

        <Section
          title="Step 2: Automated Exploratory Data Analysis (AutoEDA)"
          className="space-y-2"
          description={
            <>
              Before we clean the data, it&apos;s a good idea to
              &quot;peek&quot; inside to understand its issues. Let&apos;s use{" "}
              <span>NoventisAutoEDA</span> to automatically generate an
              interactive report.
            </>
          }
        >
          <Step2AutoEDA />
        </Section>

        <Divider />

        <Section
          titleClass="font-medium font-orbitron text-2xl md:text-3xl lg:text-4xl mt-4"
          title="Step 3: Automated Data Cleaning (Just One Line!)"
          className="space-y-2"
          description={
            <>
              Now that we know the problems, let&apos;s fix them with a single
              line of code using{" "}
              <span className="text-[#FF6849]">data_cleaner</span>. This
              function will intelligently handle missing values, outliers,
              encode categorical features, and perform scaling using smart
              defaults.
            </>
          }
        >
          <Step3DataCleaner />
        </Section>

        <Divider />

        <Section
          title="Step 4: Automated Machine Learning (AutoML)"
          className="space-y-2"
          description={
            <>
              With our data now clean, it&apos;s time to train a model.{" "}
              <span className="text-[#FF6849]">NoventisAutoML</span> will take
              over, automatically detecting the task (classification), training
              various models, and comparing them to find the best one within our
              specified time budget.
            </>
          }
        >
          <Step4AutoML />
        </Section>

        <Divider />

        <Section
          title="Step 5: See the Results!"
          description={
            <>
              The process is complete!{" "}
              <span className="text-[#FF6849]">NoventisAutoML</span> has found
              the best model and generated an interactive report that will
              appear directly in your output cell (if you&apos;re using a
              Jupyter Notebook).
            </>
          }
        >
          <Step5Results />
        </Section>

        <Divider />

        <Section title="Conclusion">
          <Conclusion />
        </Section>
      </div>
    </section>
  );
}

const QS_SETUP_CODE = `import pandas as pd
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
display(df)`;

const AUTOEDA_CODE = `# Initialize AutoEDA with our data and target
eda = NoventisAutoEDA(data=df, target='Purchased')

# Run the analysis and display the report
eda.run()`;

const DATACLEANER_CODE = `# Run the automated data cleaner
cleaned_df = data_cleaner(data=df, target_column='Purchased')

print("\\nData After Cleaning:")
display(cleaned_df.head())`;

const AUTOML_CODE = `# Initialize AutoML with the cleaned data
# We'll give it a 60-second time budget to find the best model
automl = NoventisAutoML(
    data=cleaned_df, 
    target='Purchased', 
    time_budget=60
)

# Start the training and evaluation process
results = automl.fit()`;

const CONCLUSION_POINTS = [
  { title: "Analyzed", text: "the quality of a dataset automatically." },
  { title: "Cleaned", text: "the data of various common issues." },
  { title: "Trained, evaluated, and compared", text: "multiple ML models." },
  { title: "Found", text: "the best-performing model and saved it." },
  { title: "Generated", text: "a comprehensive, interactive report." },
];

const CONCLUSION_LINKS = [
  { href: "/docs/eda_auto", label: "Learn more about AutoEDA" },
  { href: "/docs/data-cleaner", label: "Learn more about Data Cleaner" },
  { href: "/docs/predictor/auto_ml", label: "Learn more about AutoML" },
];

function Header() {
  return (
    <>
      <h3 className={cls.h3}>
        Quickstart Guide: From Raw Data to a Model in 5 Minutes
      </h3>

      <p className={cls.p}>
        Welcome to{" "}
        <span className="text-[#FF6849] font-firaCode">Noventis</span>! In this
        guide, we'll walk through a complete machine learning workflow using
        just a few lines of code. We'll take a "dirty" dataset, automatically
        analyze it, clean it, and then train and compare multiple models to find
        the best one.
      </p>

      <p className={cls.p}>Let's get started!</p>
    </>
  );
}

function Step1Setup() {
  return (
    <div className="mt-4 space-y-6">
      <CodeBlock title="PYTHON" code={QS_SETUP_CODE} />
      <CodeBlock
        title="RESULT"
        imageSrc="/quickstart-01.svg"
        imageAlt="Quickstart 01"
      />
    </div>
  );
}

function Step2AutoEDA() {
  return (
    <>
      <div className="space-y-4">
        <CodeBlock title="PYTHON" code={AUTOEDA_CODE} />
        <CodeBlock
          title="RESULT"
          imageSrc="/quickstart-02.svg"
          imageAlt="Quickstart 02"
        />
      </div>
      <p className={cls.p}>
        This single command will generate a complete HTML dashboard showing data
        distributions, missing values, correlations, and more. From this, we can
        confirm that we have missing data in the
        <span className="text-[#FF6849]"> Age, City, </span> and
        <span className="text-[#FF6849]"> Salary </span>columns.
      </p>
    </>
  );
}

function Step3DataCleaner() {
  return (
    <>
      <div className="space-y-4">
        <CodeBlock title="PYTHON" code={DATACLEANER_CODE} />
        <CodeBlock
          title="RESULT"
          imageSrc="/quickstart-03.svg"
          imageAlt="Quickstart 03"
        />
      </div>
      <p className={cls.p}>
        Notice how the <span className="text-[#FF6849]">City </span> column has
        been transformed into several numeric columns (via encoding), and all{" "}
        <span className="text-[#FF6849]">NaN </span> values have been filled.
        Our data is now clean, fully numeric, and ready for machine learning!
      </p>
    </>
  );
}

function Step4AutoML() {
  return (
    <>
      <div className="self-stretch">
        <CodeBlock title="PYTHON" code={AUTOML_CODE} />
      </div>
      <p className={cls.p}>
        This process will display a log as various models are tested. Once
        finished, the best model will be saved, and the results are ready to be
        displayed.
      </p>
    </>
  );
}

function Step5Results() {
  return (
    <>
      <p className={cls.p + " mt-3"}>
        This report contains everything you need:
      </p>
      <ul className="list-disc list-outside pl-6 space-y-1 text-[#807F8C] font-openSans text-base md:text-lg leading-normal">
        <li>Model comparison rankings.</li>
        <li>
          Detailed performance metrics of the best model (Accuracy, F1-Score,
          etc.).
        </li>
        <li>Visualizations like a Confusion Matrix and Feature Importance.</li>
      </ul>
      <div className="mt-4">
        <CodeBlock title="PYTHON" code="automl.generate_html_report()" />
      </div>
      <div className="mt-6">
        <CodeBlock
          title="RESULT"
          imageSrc="/quickstart-04.svg"
          imageAlt="Quickstart 04"
        />
      </div>
    </>
  );
}

function Conclusion() {
  return (
    <>
      <p className={cls.p}>
        Congratulations! In just a few minutes and with only a handful of code
        lines, you have successfully:
      </p>

      <ol className="list-decimal list-outside pl-6 space-y-1 text-[#807F8C] font-openSans text-sm md:text-base lg:text-lg leading-relaxed">
        {CONCLUSION_POINTS.map((item, idx) => (
          <li key={idx}>
            <span className="font-bold">{item.title}</span> {item.text}
          </li>
        ))}
      </ol>

      <p className={cls.p + " mt-4"}>
        You are now ready to explore the more in-depth features of each Noventis
        component!
      </p>

      <ul className="list-disc list-outside text-sm md:text-base lg:text-lg pl-6 space-y-2 text-[#B2B1BD] font-openSans leading-relaxed marker:text-[#FF6849]">
        {CONCLUSION_LINKS.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.href}
              className="text-[#FF6849] hover:text-[#ff896b] underline underline-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
