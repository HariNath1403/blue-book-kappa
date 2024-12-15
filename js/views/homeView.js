import Master from "./masterView.js";

class HomeView extends Master {
  clearSearchInput() {
    this.blueBookSearchBar.value = "";
  }

  getSearchQuery() {
    const queryStr = this.blueBookSearchBar.value;

    return queryStr;
  }

  getMarkup(drug) {
    const brandName = this.getBrandName(drug);
    const genericName = this.getGenericName(drug, brandName);
    return `
     <li
                class="formulary__results--link"
                data-name="${genericName}"
              >
              ${genericName}
                (${brandName}&trade;)
              </li>
    `;
  }

  loadSearchResultsToInterface(drugArr) {
    const markupArr = drugArr.map((drug) => this.getMarkup(drug));

    this.formularyResultsList.innerHTML = "";
    this.formularyResultsList.insertAdjacentHTML(
      "beforeend",
      markupArr.join("")
    );

    this.formularyIntro.classList.add("hide-display");
  }

  closeTargetPage() {
    this.targetBox.innerHTML = "";

    this.targetPage.style.transform = "translateX(-100%)";
  }

  loadTargetPageMarkup(drug) {
    const genericName = drug["Generic Name"];
    const link = drug["Lactation Link"];
    const correctMatch = this.extractDrugName(genericName, link);
    let pregnancyGuide = drug["Pregnancy guide"];
    let pregnancyLink = drug["Pregnancy Link"];
    let lactationGuide = drug["Lactation Guide"];
    let lactationLink = drug["Lactation Link"];
    let drugsDotComPregnancy = "";
    let drugsDotComLactation = "";

    if (!correctMatch) {
      pregnancyGuide = "N/A";
      pregnancyLink = "";
      lactationGuide = "N/A";
      lactationLink = "";
    } else {
      drugsDotComPregnancy = `Drugs.com&mdash;pregnancy&mdash;${correctMatch}`;
      drugsDotComLactation = `Drugs.com&mdash;breastfeeding&mdash;${correctMatch}`;
    }

    const pregnancyLinkMarkup = correctMatch
      ? `
      <div class="target__box--row--link">
        <span class="target__box--tag">Source:</span>
        <a href="${pregnancyLink}" target="_blank" class="target__box--link">${drugsDotComPregnancy}</a>
      </div>
    `
      : "";

    const lactationLinkMarkup = correctMatch
      ? `
      <div class="target__box--row--link">
        <span class="target__box--tag">Source:</span>
        <a href="${lactationLink}" target="_blank" class="target__box--link">${drugsDotComLactation}</a>
      </div>
    `
      : "";

    const markup = `
      <div class="target__box--row">
        <h3 class="target__box--header">Generic Name</h3>
        <p class="target__box--txt">${drug["Generic Name"]}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Brand Name</h3>
        <p class="target__box--txt">${drug["Brand Name"]}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Prescriber Category</h3>
        <p class="target__box--txt">${drug["Category"]}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Indication(s)</h3>
        <p class="target__box--txt">${drug["Indications"]}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Dosage</h3>
        <p class="target__box--txt">${drug["Dosage"]}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Prescribing Restrictions</h3>
        <p class="target__box--txt">${drug?.Pres?.Restrictions}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Use in Pregnancy</h3>
        <p class="target__box--txt">${pregnancyGuide}</p>
        ${pregnancyLinkMarkup}
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Use while Breastfeeding</h3>
        <p class="target__box--txt">${lactationGuide}</p>
        ${lactationLinkMarkup}
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Drug Code</h3>
        <p class="target__box--txt">${drug["MDC"]}</p>
      </div>
    `;

    return markup;
  }

  loadTargetPage(drug) {
    const markup = this.loadTargetPageMarkup(drug);
    this.targetBox.innerHTML = "";
    this.targetBox.insertAdjacentHTML("beforeend", markup);
    this.targetPage.style.transform = "translateX(0)";
  }

  handlerClearSearchInput(handler) {
    this.formularySearchClearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerActivateSearch(handler) {
    this.blueBookSearchBar.addEventListener("keydown", handler);
  }

  handlerGetLinkDataSet(handler) {
    const links = document.querySelectorAll(".formulary__results--link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const dataName = e.target.dataset.name;
        return handler(dataName);
      });
    });
  }

  handlerCloseTargetPage(handler) {
    this.targetExitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new HomeView();
