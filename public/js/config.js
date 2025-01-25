import allViews from "./views/allViews.js";
import homeView from "./views/homeView.js";
import calculatorView from "./views/calculatorView.js";
/*
const apiUrl =
  "mongodb+srv://harivinnathan:<db_password>@cluster0.dsexi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbPassword = "Y0AsZxShOsLtAyku";
*/

// NAV
export const loadFormulary = function () {
  homeView.clearSearchInput();
  allViews.loadFormularyPage();
};

export const loadCalculator = function () {
  allViews.loadCalculatorPage();
};

// FORMULARY
export const apiUrl = "https://blue-book-api.netlify.app/blue-book.json";

// Helper functions
export function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && day < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// CALCULATORS
export const calcAdjBodyWeight = function () {
  calculatorView.getBodyWeightAdjData();
};

export const clearAdjBodyWeight = function () {
  calculatorView.clearIBWForm();
};

export const calcCreatinine = function () {
  calculatorView._getDataForCreatinineCalculator();
};

export const clearCreatinine = function () {
  calculatorView.clearCreatinineForm();
};

export const calcCalcium = function () {
  calculatorView.getCalciumData();
};

export const clearCalcium = function () {
  calculatorView.clearCalciumForm();
};

export const calcSodium = function () {
  calculatorView.getSodiumData();
};

export const clearSodium = function () {
  calculatorView.clearSodiumForm();
};

export const calcPotassiumDeficit = function () {
  calculatorView.getPotassiumDeficitData();
};

export const clearPotassiumDeficit = function () {
  calculatorView.clearPotassiumForm();
};

export const calcGetMap = function () {
  calculatorView.getMAPData();
};

export const clearMAP = function () {
  calculatorView.clearMAPForm();
};

export const calcOpiateConv = function () {
  calculatorView.getOpiateConversionData();
};

export const clearOpiateConv = function () {
  calculatorView.clearOpiateForm();
};

export const calcGanzoniEq = function () {
  calculatorView.getGanzoniCalculation();
};

export const clearGanzoni = function () {
  calculatorView.clearGanzoniForm();
};

export const calcChildPughScore = function () {
  calculatorView.getChildPughScore();
};

export const clearPugh = function () {
  calculatorView.clearChildPugh();
};

export const calcAscvd = function () {
  calculatorView.getAscvdRisk();
};

export const clearAscvd = function () {
  calculatorView.clearAscvdForm();
};

export const calcWarfarinAdjustedDose = function () {
  calculatorView.getWarfarinDoseAdjustment();
};

export const clearWarfarinAdjustment = function () {
  calculatorView.clearINRForm();
};

export const calcAnticoagulantConv = function () {
  calculatorView.getAnticoagulantConvData();
};

export const clearAnticoagulantConv = function () {
  calculatorView.clearAnticoagulantConvForm();
};

export const calcDenverRisk = function () {
  calculatorView.getDenverRisk();
};

export const clearDenverRisk = function () {
  calculatorView.clearDenverForm();
};

// CPGs
export const cpgs = {
  chronic: [
    "Management-of-Chronic-Kidney-Disease-2018.json",
    "Management-of-Dyslipidaemia-2017.json",
    "Management-of-Heart-Failure-2019.json",
    "Management-of-Hypertension-2018.json",
    "Management-of-Ischemic-Stroke-2020.json",
    "Management-of-Stable-CAD-2018.json",
    "Management-of-STEMI-2019.json",
    "Management-Type-2-Diabetes-Mellitus-2020.json",
    "MTAC-Anticoagulant-2020.json",
  ],
  dilution: [
    "Dilution-Protocol-(2nd-Edition)-2020.json",
    "extemporaneous-formulation-2015.json",
    "X-Temp-Master-Formulation-Sheets-[2018].json",
  ],
  infxn: [
    "HIV-Guideline-2017.json",
    "Management-of-Chronic-Hepatitis-C-2019.json",
    "Management-of-Drug-Resistant-Tuberculosis-2016.json",
    "Management-of-Tuberculosis-2012.json",
    "STI-Guidelines-2021.json",
  ],
  others: [
    "CPG-Methadone-2016-(Malay).json",
    "CPG-Rheumatod--Arthritis-2019.json",
    "Management-of-Chronic-Kidney-Disease-2018.json",
    "Management-of-Thyroid-Disorders-2019.json",
    "topical-preparation-2019.json",
  ],
  paed: ["Paediatric_Protocols-Aug_2019.json"],
  psy: [
    "Austism-Spectrum-2016.json",
    "Bipolar-Disorder-2014.json",
    "Epilepsy-2017.json",
    "MDD-2019.json",
    "Schizophrenia-2009.json",
  ],
  respi: [
    "Clinical-Practice-Guidelines-on-Treatment-of-Tobacco-Use-Disorder-2016.json",
    "GINA-2024.json",
    "Management-of-EVALI-2021.json",
  ],
};

export const nagUrl = "https://sites.google.com/moh.gov.my/nag";

export const getSnippet = function (text, query) {
  const cleanedText = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

  const queryIndex = cleanedText.toLowerCase().indexOf(query.toLowerCase());
  if (queryIndex === -1) return "";

  // Find the start of the sentence
  const sentenceStart =
    cleanedText.lastIndexOf(".", queryIndex) + 1 ||
    cleanedText.lastIndexOf("!", queryIndex) + 1 ||
    cleanedText.lastIndexOf("?", queryIndex) + 1 ||
    0;

  // Find the end of the sentence
  const sentenceEnd = (() => {
    const period = cleanedText.indexOf(".", queryIndex);
    const exclamation = cleanedText.indexOf("!", queryIndex);
    const question = cleanedText.indexOf("?", queryIndex);

    const ends = [period, exclamation, question].filter(
      (index) => index !== -1
    );
    return ends.length > 0 ? Math.min(...ends) + 1 : cleanedText.length;
  })();

  const snippet = cleanedText.substring(sentenceStart, sentenceEnd).trim();

  return snippet;
};

// Others Page
export const checklistLink = document.getElementById("others-checklist");
export const reportLink = document.getElementById("others-report");
