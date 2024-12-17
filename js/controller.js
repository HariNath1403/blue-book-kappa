import * as config from "./config.js";
import * as model from "./model.js";
import homeView from "./views/homeView.js";
import targetView from "./views/targetView.js";

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

document.addEventListener("DOMContentLoaded", initFx);
initFormularyFxs();

history.pushState(null, null, location.href);

window.onpopstate = function () {
  if (window.history.state === null) {
    history.pushState(null, null, location.href);
    window.location.reload();
  } else {
    history.back();
  }
};
