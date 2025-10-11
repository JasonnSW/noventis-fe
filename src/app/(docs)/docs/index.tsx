export default {
  DATA_CLEANER: [
    ["NoventisImputer", "/docs/data-cleaner"],
    ["NoventisOutlierHandler", "/docs/data-cleaner/handle-outliers"],
    ["NoventisEncoder", "/docs/data-cleaner/encode"],
    ["scale()", "/docs/data-cleaner/scale"],
    ["get_data_quality_score()", "/docs/data-cleaner/get-data-quality-score"],
    [
      "show_changes_visualization()",
      "/docs/data-cleaner/show-changes-visualization",
    ],
  ] as const,

  EDA_AUTO: [
    ["EDAAuto Class", "/docs/eda-auto"],
    ["generate_report()", "/docs/eda-auto/generate-report"],
  ] as const,

  PREDICTOR: [
    ["Predictor Class", "/docs/predictor"],
    ["automl_train()", "/docs/predictor/automl-train"],
    ["manual_train()", "/docs/predictor/manual-train"],
    ["predict()", "/docs/predictor/predict"],
    ["get_metrics()", "/docs/predictor/get-metrics"],
  ] as const,
};
