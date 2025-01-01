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
