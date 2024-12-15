import * as config from "./config.js";
import * as model from "./model.js";
import homeView from "./views/homeView.js";

const url = config.apiUrl;

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
  console.log(target);
  homeView.loadTargetPage(target);
};

const exitTargetPage = function () {
  homeView.closeTargetPage();
};

const initFormularyFxs = function () {
  homeView.handlerClearSearchInput(clearFormularySearchInputBox);
  homeView.handlerActivateSearch(loadFormularySearchEngine);
  homeView.handlerCloseTargetPage(exitTargetPage);
};

document.addEventListener("DOMContentLoaded", initFx);
initFormularyFxs();
