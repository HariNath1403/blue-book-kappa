export default class Master {
  // All (Master Controls)
  navFormulary = document.getElementById("nav-load-formulary");
  navCPGs = document.getElementById("nav-load-cpg");
  navCalculator = document.getElementById("nav-load-calculator");

  pageFormulary = document.getElementById("formulary");
  pageCPG = document.getElementById("cpg");
  pageCalculator = document.getElementById("calculator");

  // Formulary
  formularyIntro = document.querySelector(".formulary__intro");
  formularyResultsList = document.querySelector(".formulary__results--list");
  blueBookSearchBar = document.querySelector(".formulary__search--input");
  targetPage = document.getElementById("target");
  targetBox = document.querySelector(".target__box");

  formularySearchClearBtn = document.querySelector(".formulary__search--clear");
  targetExitBtn = document.querySelector(".target__exit--btn");

  getBrandName(drug) {
    const matches = drug.match(/\(([^)]+)\)/g);
    const lastMatch = matches ? matches[matches.length - 1] : null;
    const lastContent = lastMatch ? lastMatch.slice(1, -1) : null;

    return lastContent;
  }

  getGenericName(drug, brand) {
    const regex = new RegExp(`\\(${brand}\\)`, "g");
    return drug.replace(regex, "").trim();
  }

  extractDrugName(drugName, link) {
    if (link === "N/A") return false;

    const regex = /\/([^\/]+)\.html$/;
    let match = link.match(regex);

    if (match && match[1]) {
      match = match[1];
    }

    if (drugName.toLowerCase().includes(match.toLowerCase())) {
      return match;
    } else {
      return false;
    }
  }
}
