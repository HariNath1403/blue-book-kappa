import Master from "./masterView.js";

class AllViews extends Master {
  _allClasses = [
    this.pageFormulary,
    this.pageCPG,
    this.pageCalculator,
    this.pageOthers,
  ];

  hideAllClasses() {
    this._allClasses.forEach((page) => {
      page.classList.add("hide-display");
    });
  }

  loadFormularyPage() {
    this.hideAllClasses();
    this.pageFormulary.classList.remove("hide-display");
  }

  loadCPGPage() {
    this.hideAllClasses();
    this.pageCPG.classList.remove("hide-display");
  }

  loadOthersPage() {
    this.hideAllClasses();
    this.pageOthers.classList.remove("hide-display");
  }

  loadCalculatorPage() {
    const calcInterface = document.querySelector(".calc__interface");
    const calcList = document.querySelector(".calc__list");
    const allCalcBoxes = document.querySelectorAll(".calculator__box");

    this.hideAllClasses();
    this.pageCalculator.classList.remove("hide-display");

    allCalcBoxes.forEach((box) => {
      box.classList.add("hide-display");
    });
    calcInterface.classList.remove("hide-display");
    calcList.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  handlerLoadFormulary(handler) {
    this.navFormulary.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerLoadCPG(handler) {
    this.navCPGs.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerLoadCalculator(handler) {
    this.navCalculator.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerLoadOthers(handler) {
    this.navOthers.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new AllViews();
