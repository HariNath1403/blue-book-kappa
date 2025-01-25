import * as config from "../config.js";

class OthersView {
  _mainPage = document.getElementById("commands");
  _checklistPage = document.getElementById("checklist");
  _commandIndexes = document.querySelectorAll(".commands__index");

  _checklistRadioes = document.querySelectorAll(".checklist__radio");
  _checklistLanguage = document.getElementById("language-toggle");
  _checklistBtnOpen = document.querySelector(".checklist__submit--btn");

  openMainPage() {
    this._mainPage.classList.remove("hide-display");
    this._checklistPage.classList.add("hide-display");
  }

  hideMainPage() {
    this._mainPage.classList.add("hide-display");
  }

  resetChecklistForm() {
    this._checklistRadioes.forEach((radio) => (radio.checked = false));
    this._checklistLanguage.checked = false;
  }

  getChecklistSelection() {
    const selectedRadio = document.querySelector(".checklist__radio:checked");
    const language = document.getElementById("language-toggle").checked
      ? "Malay"
      : "English";

    if (!selectedRadio) return;

    const targetChecklist = selectedRadio.value;

    this.resetChecklistForm();

    return [targetChecklist, language];
  }

  reportEmail() {
    const email = "harivin@moh.gov.my";
    const subject = "REPORT A PROBLEM (WITH EVIDENCE)";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  }

  handlerNavigate() {
    config.checklistLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.hideMainPage();
      this._checklistPage.classList.remove("hide-display");
    });
  }

  handlerOpenChecklist(handler) {
    this._checklistBtnOpen.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerSendReportEmail() {
    const emailBtn = document.getElementById("others-report");

    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.reportEmail();
    });
  }
}

export default new OthersView();
