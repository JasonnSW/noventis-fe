export default {
  EDA_AUTO: [["NoventisAutoEda", "/docs/eda_auto"]] as const,

  DATA_CLEANER: [
    ["NoventisImputer", "/docs/data-cleaner/imputer"],
    ["NoventisOutlierHandler", "/docs/data-cleaner/handle-outliers"],
    ["NoventisEncoder", "/docs/data-cleaner/encode"],
    ["NoventisScaler", "/docs/data-cleaner/scale"],
    ["NoventisDataCleaner", "/docs/data-cleaner"],
  ] as const,

  PREDICTOR: [
    ["NoventisAutoML", "/docs/predictor/auto_ml"],
    ["NoventisManualML", "/docs/predictor/manual_ml"],
  ] as const,
};
