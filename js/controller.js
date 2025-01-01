import * as config from "./config.js";
import * as model from "./model.js";
import allViews from "./views/allViews.js";
import homeView from "./views/homeView.js";
import targetView from "./views/targetView.js";
import calculatorView from "./views/calculatorView.js";

const url = config.apiUrl;

// NAV
const navInits = function () {
  allViews.handlerLoadFormulary(config.loadFormulary);
  allViews.handlerLoadCalculator(() => {
    config.loadCalculator();
    getCalculatorInfo();
  });
};

// FORMULARY
const initFx = async function () {
  const allData = await model.loadApiData(url);
  allData.forEach((drug) => {
    model.allDrugs.push(drug["Query"]);
  });
};

const loadFormularyListResults = function (str) {
  const matches = model.loadFormularySearch(str);
  homeView.loadSearchResultsToInterface(matches);
  homeView.handlerGetLinkDataSet((drug) => loadTargetDrugInfo(drug));
};

const clearFormularySearchInputBox = function () {
  homeView.clearSearchInput();
  loadFormularyListResults("");
};

const loadFormularySearchEngine = function () {
  const searchQuery = homeView.getSearchQuery();
  loadFormularyListResults(searchQuery);
};

const loadTargetDrugInfo = function (drug) {
  const target = model.getTargetDrugInfo(drug);
  targetView.loadTargetPage(target);
};

const exitTargetPage = function () {
  targetView.closeTargetPage();
};

const initFormularyFxs = function () {
  homeView.handlerClearSearchInput(clearFormularySearchInputBox);
  homeView.handlerActivateSearch(loadFormularySearchEngine);
  targetView.handlerCloseTargetPage(exitTargetPage);
};

// CALCULATORS
let calculatorMaster;

const getCalculatorInfo = async function () {
  const [ids, headers, subs] = calculatorView.getAllCalculatorNames();
  calculatorMaster = model.transferDataToCalcDict(ids, headers, subs);
  await calculatorView.loadCalculators(calculatorMaster);
  afterLoadingCalcFxs();
};

const filterCalculatorsLoaded = function (calculatorMaster, queryStr) {
  calculatorView.searchMatchedCalculators(calculatorMaster, queryStr);
};

const selectCalculator = function (id) {
  calculatorView.loadTargetCalculator(id);
};

const afterLoadingCalcFxs = function () {
  calculatorView.handlerLoadTargetCalculator((id) => selectCalculator(id));
};

const initCalcFxs = function () {
  calculatorView.handlerFilterSearchCalculators((str) => {
    filterCalculatorsLoaded(calculatorMaster, str);
  });
  calculatorView.handlerCalcBodyWeightAdj(config.calcAdjBodyWeight);
  calculatorView.handlerResetBodyWeightAdj(config.clearAdjBodyWeight);
  calculatorView.handlerSwitchSerumCreatininePlaceholder();
  calculatorView.handlerCalcCreatinine(config.calcCreatinine);
  calculatorView.handlerClearCreatinineForm(config.clearCreatinine);
  calculatorView.handlerSubmitCalciumData(config.calcCalcium);
  calculatorView.handlerClearCalciumForm(config.clearCalcium);
  calculatorView.handlerSubmitSodiumData(config.calcSodium);
  calculatorView.handlerClearSodiumForm(config.clearSodium);
  calculatorView.handlerSubmitPotassiumData(config.calcPotassiumDeficit);
  calculatorView.handlerClearPotassiumForm(config.clearPotassiumDeficit);
  calculatorView.handlerSubmitMAPData(config.calcGetMap);
  calculatorView.handlerClearMAPForm(config.clearMAP);
  calculatorView.handlerSubmitOpiateData(config.calcOpiateConv);
  calculatorView.handlerClearOpiateForm(config.clearOpiateConv);
  calculatorView.handlerSubmitGanzoniData(config.calcGanzoniEq);
  calculatorView.handlerClearGanzoniForm(config.clearGanzoni);
  calculatorView.handlerSubmitPughData(config.calcChildPughScore);
  calculatorView.handlerClearPughForm(config.clearPugh);
  calculatorView.handlerSubmitAscvdData(config.calcAscvd);
  calculatorView.handlerClearAscvdForm(config.clearAscvd);
  calculatorView.handlerSubmitINRData(config.calcWarfarinAdjustedDose);
  calculatorView.handlerClearINRForm(config.clearWarfarinAdjustment);
  calculatorView.handlerSubmitAnticoagulantData(config.calcAnticoagulantConv);
  calculatorView.handlerClearAnticoagulantForm(config.clearAnticoagulantConv);
  calculatorView.handlerSubmitDenverData(config.calcDenverRisk);
  calculatorView.handlerClearDenverForm(config.clearDenverRisk);
};

// INIT Fxs
navInits();
document.addEventListener("DOMContentLoaded", initFx);
initFormularyFxs();
initCalcFxs();

// Double-Click to EXIT App
history.pushState(null, null, location.href);
window.onpopstate = function () {
  if (window.history.state === null) {
    history.pushState(null, null, location.href);
    window.location.reload();
  } else {
    history.back();
  }
};
