import Master from "./masterView.js";

class AllViews extends Master {
  _allClasses = [this.pageFormulary, this.pageCalculator];

  hideAllClasses() {
    this._allClasses.forEach((page) => {
      page.classList.add("hide-display");
    });
  }

  loadFormularyPage() {
    this.hideAllClasses();
    this.pageFormulary.classList.remove("hide-display");
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

  handlerLoadCalculator(handler) {
    this.navCalculator.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new AllViews();
