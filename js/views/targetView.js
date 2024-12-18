import Master from "./masterView.js";

class TargetView extends Master {
  closeTargetPage() {
    this.targetBox.innerHTML = "";
    this.targetPage.style.transform = "translateX(-100%)";
  }

  loadTargetPage(drug) {
    const markup = this.loadTargetPageMarkup(drug);
    this.targetBox.innerHTML = "";
    this.targetBox.insertAdjacentHTML("beforeend", markup);
    this.targetPage.style.transform = "translateX(0)";
  }

  sourceMarkup(link, drug, test) {
    if (link === "" || link === "ERR") {
      return "";
    } else {
      return `
    <div class="target__box--row--link">
      <span class="target__box--tag">Source:</span>
      <a href="${link}" target="_blank" class="target__box--link">Drugs.com&mdash;${test}&mdash;${drug}</a>
    </div>`;
    }
  }

  loadSideEffects(txt) {
    if (txt === "[]" || txt === "ERR" || !txt) return "N/A";

    function markup(txtEl) {
      return `<li class="target__box--list--index">&mdash; ${txtEl}</li>`;
    }

    const validJsonString = txt.replace(/'/g, '"');

    const txtArr = JSON.parse(validJsonString);

    return txtArr.map((el) => markup(el)).join("");
  }

  loadShorterText(txt) {
    if (!txt || txt === "ERR") return "N/A";
    let txtArr = txt.split(".");
    const regex = /(AU|US|UK|Comments|Comment)/g;

    if (txtArr.length > 2) {
      return (
        txtArr[0].replace(regex, ".<br>&mdash;$&") +
        ". " +
        txtArr[1].replace(regex, ".<br>&mdash;$&") +
        "."
      );
    } else {
      return txtArr[0].replace(regex, ".<br>&mdash;$&") + ".";
    }
  }

  formatWithLineBreaks(text) {
    // const regex = /(ii|iii|iv|v|vi|vii|viii|ix)[.)]/g;
    const regex = /(?<=.)\b(i|ii|iii|iv|v|vi|vii|viii|ix)[.)]/g;

    let formattedText = text.replace(regex, "<br>$&");

    const childBreakPattern = /(Child:|Children:)/g;

    formattedText = formattedText.replace(childBreakPattern, "<br>$&");

    formattedText = formattedText.replace(
      /\bCHILD\b/gi,
      "<strong>CHILD</strong>"
    );

    formattedText = formattedText.replace(
      /\bCHILDREN\b/gi,
      "<strong>CHILDREN</strong>"
    );

    formattedText = formattedText.replace(
      /\bADULT\b/gi,
      "<strong>ADULT</strong>"
    );

    formattedText = formattedText.replace(
      /\bADULTS\b/gi,
      "<strong>ADULTS</strong>"
    );

    formattedText = formattedText.replace(
      /\bmaximum|max\b/gi,
      "<strong>MAXIMUM</strong>"
    );

    return formattedText;
  }

  loadTargetPageMarkup(drug) {
    const genericName = drug["Generic"];
    const brandName = drug["Brand"];
    const prescriberCategory = drug["Categroy"];
    const indication = drug["Indications"];
    const dosage = drug["Dosage"];
    const restrictions = drug["Restrictions"];
    const sideEffects = drug["SE"];
    const linkSideEffects = drug["Link-s"];
    const pregnancyGuide = drug["Pregnancy"];
    const linkPregnancy = drug["Link-p"];
    const breastfeedingGuide = drug["Breastfeeding"];
    const linkBreastfeeding = drug["Link-b"];
    const simpleSearch = drug["Search"];
    const mdcNo = drug["MDC"];

    const markup = `
      <div class="target__box--row">
        <h3 class="target__box--header">Generic Name</h3>
        <p class="target__box--txt">${genericName}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Brand Name</h3>
        <p class="target__box--txt">${brandName}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Prescriber Category</h3>
        <p class="target__box--txt">${prescriberCategory}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Indication(s)</h3>
        <p class="target__box--txt">${this.formatWithLineBreaks(indication)}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Dosage</h3>
        <p class="target__box--txt">${this.formatWithLineBreaks(dosage)}</p>
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Prescribing Restrictions</h3>
        <p class="target__box--txt">${restrictions}</p>
      </div>
       <div class="target__box--row">
        <h3 class="target__box--header">Common Side Effects</h3>
        <u; class="target__box--list">${this.loadSideEffects(sideEffects)}</u;>
        ${this.sourceMarkup(linkSideEffects, simpleSearch, "s/eff")}
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Use in Pregnancy</h3>
        <p class="target__box--txt">${this.loadShorterText(pregnancyGuide)}</p>
        ${this.sourceMarkup(linkPregnancy, simpleSearch, "pregnancy")}
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Use while Breastfeeding</h3>
        <p class="target__box--txt">${this.loadShorterText(
          breastfeedingGuide
        )}</p>
        ${this.sourceMarkup(linkBreastfeeding, simpleSearch, "breastfeeding")}
      </div>
      <div class="target__box--row">
        <h3 class="target__box--header">Drug Code</h3>
        <p class="target__box--txt">${mdcNo}</p>
      </div>
    `;

    return markup;
  }

  handlerCloseTargetPage(handler) {
    this.targetExitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new TargetView();
