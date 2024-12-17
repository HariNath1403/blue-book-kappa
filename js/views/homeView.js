import Master from "./masterView.js";

class HomeView extends Master {
  clearSearchInput() {
    this.formularyResultsList.innerHTML = "";
    this.blueBookSearchBar.value = "";
    this.formularyResultsList.scrollTop = 0;
  }

  getSearchQuery() {
    const queryStr = this.blueBookSearchBar.value;

    return queryStr;
  }

  getMarkup(drug) {
    const brandName = this.getBrandName(drug);
    const genericName = this.getGenericName(drug, brandName);

    const markupFullName = `
     <li
                class="formulary__results--link"
                data-name="${genericName}"
              >
              ${genericName}
                (${brandName}&trade;)
              </li>
    `;

    const markupHalfName = `
    <li
                class="formulary__results--link"
                data-name="${genericName}"
              >
              ${genericName}
              </li>`;

    if (!brandName) return markupHalfName;
    else return markupFullName;
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
}

export default new HomeView();
