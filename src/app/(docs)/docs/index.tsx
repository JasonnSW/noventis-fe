export default {
  DATA_CLEANER: [
    ["NoventisImputer", "/docs/data-cleaner/imputer"],
    ["NoventisOutlierHandler", "/docs/data-cleaner/handle-outliers"],
    ["NoventisEncoder", "/docs/data-cleaner/encode"],
    ["NoventisScaler", "/docs/data-cleaner/scale"],
    ["NoventisDataCleaner", "/docs/data-cleaner"],
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
