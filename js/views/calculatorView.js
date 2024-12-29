import * as calc from "../others/calculator.js";
import * as helper from "../config.js";

class CalculatorView {
  // INIT Fxs
  _allCalcBoxes = document.querySelectorAll(".calculator__box");

  getAllCalculatorNames() {
    const bxId = [];
    const bxHeader = [];
    const bxSub = [];

    const cleanStr = function (str) {
      return str.replace(/\n/g, "").trim();
    };

    this._allCalcBoxes.forEach((box) => {
      const id = box.getAttribute("id");
      const header = cleanStr(
        document.querySelector(`#${id} .calculator__header`).textContent
      );
      const subHeader = cleanStr(
        document.querySelector(`#${id} .calculator__header--sub`).textContent
      );

      bxId.push(id);
      bxHeader.push(header);
      bxSub.push(subHeader);
    });
    return [bxId, bxHeader, bxSub];
  }

  async loadCalculators(dict) {
    const listBox = document.querySelector(".calc__list");
    const searchQuery = document.querySelector(".calc__search--input");

    const loadMarkup = function (id, header, subHeader) {
      const markup = `<li class="calc__list--btn" data-id="${id}">
                <h3 class="calc__list--btn--header">${header}</h3>
                <h4 class="calc__list--btn--sub">${subHeader}</h4></h4>
              </li>`;

      return markup;
    };
    const allMarkups = [];

    for (let i = 0; i < dict.id.length; i++) {
      const curMarkup = loadMarkup(
        dict.id[i],
        dict.header[i],
        dict.subHeader[i]
      );
      allMarkups.push(curMarkup);
    }

    listBox.innerHTML = "";
    listBox.insertAdjacentHTML("beforeend", allMarkups.join(""));
    searchQuery.value = "";
  }

  loadTargetCalculator(id) {
    const targetInterface = document.querySelector(".calc__interface");
    const targetCalc = document.getElementById(`${id}`);

    targetInterface.classList.add("hide-display");
    targetCalc.classList.remove("hide-display");
  }

  searchMatchedCalculators(dict, queryStr) {
    const listBox = document.querySelector(".calc__list");
    const filteredDict = {
      id: [],
      header: [],
      subHeader: [],
    };

    for (let i = 0; i < dict.id.length; i++) {
      const curId = dict.id[i];
      const curHeader = dict.header[i];
      const curSub = dict.subHeader[i];

      const checkHeader = curHeader.trim().toLowerCase();

      if (checkHeader.includes(queryStr)) {
        filteredDict.id.push(curId);
        filteredDict.header.push(curHeader);
        filteredDict.subHeader.push(curSub);
      }
    }

    const loadMarkup = function (dict, i) {
      const markup = `<li class="calc__list--btn" data-id="${dict.id[i]}">
                <h3 class="calc__list--btn--header">${dict.header[i]}</h3>
                <h4 class="calc__list--btn--sub">${dict.subHeader[i]}</h4></h4>
              </li>`;

      return markup;
    };
    const allMarkups = [];

    for (let i = 0; i < filteredDict.id.length; i++) {
      allMarkups.push(loadMarkup(filteredDict, i));
    }

    listBox.innerHTML = "";
    listBox.insertAdjacentHTML("beforeend", allMarkups.join(""));
  }

  handlerLoadTargetCalculator(handler) {
    const allBxs = document.querySelectorAll(".calc__list--btn");

    allBxs.forEach((box) => {
      box.addEventListener("click", () => {
        const target = box.dataset["id"];
        handler(target);
      });
    });
  }

  handlerFilterSearchCalculators(handler) {
    const searchQuery = document.querySelector(".calc__search--input");
    const searchBtn = document.querySelector(".calc__search--btn");

    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const queryStr = searchQuery.value.trim().toLowerCase();
      handler(queryStr);
    });
  }

  // Child-Pugh
  _calcBoxPugh = document.getElementById("calc-pugh");
  _calcPughForm = document.getElementById("calc-pugh-form");
  _pughBilirubin = document.getElementById("pugh-bilirubin");
  _pughAlbumin = document.getElementById("pugh-albumin");
  _pughInr = document.getElementById("pugh-inr");
  _pugAscites = document.getElementById("pugh-ascites");
  _pughBtnSubmit = document.getElementById("calc-pugh-submit");
  _pughBtnReset = document.getElementById("calc-pugh-reset");
  _pughResult = document.getElementById("calc-pugh-result");

  // Ganzoni Equation
  _calcGanzoniBox = document.getElementById("calc-ganzoni");
  _ganzoniForm = document.getElementById("calc-ganzoni-form");
  _ganzoniWeight = document.getElementById("calc-ganzoni-weight");
  _ganzoniTarget = document.getElementById("calc-ganzoni-target");
  _ganzoniActual = document.getElementById("calc-ganzoni-actual");
  _ganzoniBtnSubmit = document.getElementById("calc-ganzoni-submit");
  _ganzoniBtnReset = document.getElementById("calc-ganzoni-reset");
  _ganzoniResult = document.getElementById("calc-ganzoni-result");

  // Opiate Conversion
  _calcOpiateBox = document.getElementById("calc-opiate");
  _opiateForm = document.getElementById("calc-opiate-form");
  _opiateFrom = document.getElementById("calc-opiate-from");
  _opiateDose = document.getElementById("calc-opiate-dose");
  _opiateTo = document.getElementById("calc-opiate-to");
  _opiateBtnSubmit = document.getElementById("calc-opiate-submit");
  _opiateBtnReset = document.getElementById("calc-opiate-reset");
  _opiateResult = document.getElementById("calc-opiate-result");

  // MAP
  _calcMapBox = document.getElementById("calc-map");
  _calcMapForm = document.getElementById("calc-map-form");
  _calcMapSBP = document.getElementById("calc-map-sbp");
  _calcMapDBP = document.getElementById("calc-map-dbp");
  _mapBtnSubmit = document.getElementById("calc-map-submit");
  _mapBtnReset = document.getElementById("calc-map-reset");
  _calcMapResult = document.getElementById("calc-map-result");

  // Potassium Deficit
  _calcPotassiumDeficitBox = document.getElementById("calc-potassium");
  _calcPotassiumForm = document.getElementById("calc-potassium-form");
  _calcPotassiumWeight = document.getElementById("calc-potassium-weight");
  _calcPotassiumMeasuredPotassium = document.getElementById(
    "calc-potassium-potassium"
  );
  _potassiumDeficitBtnSubmit = document.getElementById("calc-potassium-submit");
  _potassiumDeficitBtnReset = document.getElementById("calc-potassium-reset");
  _potassiumDeficitResult = document.getElementById("calc-potassium--result");

  // Sodium Correction
  _calcSodiumBox = document.getElementById("calc-sodium");
  _calcSodiumForm = document.getElementById("calc-sodium-form");
  _sodiumSodiumLevel = document.getElementById("calc-sodium-sodium");
  _sodiumGlucoseLevel = document.getElementById("calc-sodium-glucose");
  _sodiumBtnSubmit = document.getElementById("calc-sodium-submit");
  _sodiumBtnClear = document.getElementById("calc-sodium-reset");
  _sodiumResult = document.getElementById("calc-sodium--result");

  // Calcium Correction
  _calcCalciumBox = document.getElementById("calculator-calcium");
  _calciumForm = document.getElementById("calculator-calcium--form");
  _calciumSerumCalcium = document.getElementById("calculator-calcium--calcium");
  _calciumSerumAlbumin = document.getElementById("calculator-calcium--albumin");
  _calciumSubmit = document.getElementById("calculator-calcium--submit");
  _calciumReset = document.getElementById("calculator-calcium--reset");
  _calciumResult = document.getElementById("calculator-calcium--result");

  // Creatinine Clerance
  _calcBoxCreatinine = document.getElementById("calculator-creatinine");
  _creatinineAge = document.getElementById("calculator-creatinine--age");
  _creatinineDob = document.getElementById("calculator-creatinine--dob");
  _creatinineWeight = document.getElementById("calculator-creatinine--weight");
  _creatinineSerumCreatinine = document.getElementById(
    "calculator-creatinine--scr"
  );
  _creatinineUnit = document.getElementById("yesNoSlider-creatinine");
  _creatinineBtnSubmit = document.getElementById(
    "calculator-creatinine-submit"
  );
  _creatinineBtnReset = document.getElementById("calculator-creatinine-reset");
  _creatinineForm = document.getElementById("calculator-creatinine--form");
  _creatinineResult = document.getElementById("calculator-creatinine--result");

  // Adjusted Body Weight
  _calcBoxIbw = document.getElementById("calculator-IBW");
  _ibwWeight = document.getElementById("calculator-IBW--weight");
  _ibwHeight = document.getElementById("calculator-IBW--height");
  _ibwSubmit = document.getElementById("calculator-IBW-submit");
  _ibwReset = document.getElementById("calculator-IBW-reset");
  _ibwForm = document.getElementById("calculator-IBW--form");
  _ibwResult = document.getElementById("calculator-IBW--result");

  /*
  // ASCVD Risk
  _calcBoxASCVD = document.getElementById("calc-ascvd");
  _ascvdForm = document.getElementById("ascvd-form");
  _ascvdAge = document.getElementById("ascvd-age");
  _ascvdDob = document.getElementById("ascvd-dob");
  _ascvdDm = document.getElementById("ascvd-diabetes");
  _ascvdSex = document.getElementById("ascvd-sex");
  _ascvdSmoker = document.getElementById("ascvd-smoker");
  _ascvdTotalChol = document.getElementById("ascvd-total-cholesterol");
  _ascvdHdl = document.getElementById("ascvd-hdl");
  _ascvdSbp = document.getElementById("ascvd-sbp");
  _ascvdTxHtn = document.getElementById("ascvd-htn");
  _ascvdRace = document.getElementById("ascvd-race");
  _ascvdBtnSubmit = document.getElementById("calc-ascvd-submit");
  _ascvdBtnReset = document.getElementById("calc-ascvd-reset");

  getASCVDAge() {
    if (!this._ascvdAge.value && !this._ascvdDob.value) {
      alert("Please complete all the required fields");
      return;
    }

    let calcAge;

    if (this._ascvdAge.value) {
      calcAge = +this._ascvdAge.value;
    } else {
      calcAge = helper.calculateAge(this._ascvdDob.value);
    }
    return calcAge;
  }

  getAscvdRiskData() {
    const age = this.getASCVDAge();
    const diabetes = +this._ascvdDm.value;
    const sex = this._ascvdSex.value;
    const smoker = +this._ascvdSmoker.value;
    const totalChol = parseFloat(this._ascvdTotalChol.value);
    const hdlChol = parseFloat(this._ascvdHdl.value);
    const sbp = +this._ascvdSbp.value;
    const treatmentForHtn = +this._ascvdTxHtn.value;
    const race = +this._ascvdRace.value;

    if (!age || !totalChol || !hdlChol || !sbp) {
      alert("Please complete all the required fields");
      return;
    }

    if (age <= 0 || totalChol < 0 || hdlChol < 0 || sbp < 0) {
      alert("Inputs must be positive and greater than zero");
      return;
    }

    const data = new calc.ASCVDRisk(
      age,
      diabetes,
      sex,
      smoker,
      totalChol,
      hdlChol,
      sbp,
      treatmentForHtn,
      race
    );
    console.log(data);
  }

  handlerSubmitAscvdData(handler) {
    this._ascvdBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearAscvdForm(handler) {
    this._ascvdBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
*/

  // Child-Pugh
  getChildPughScore() {
    const pughEncephalopathy = document.querySelector(
      'input[name="pugh-encephalopathy"]:checked'
    );

    const score =
      Number(this._pughBilirubin.value) +
      Number(this._pughAlbumin.value) +
      Number(this._pughInr.value) +
      Number(this._pugAscites.value) +
      Number(pughEncephalopathy.value);

    const childPughScore = new calc.ChildPugh(score);
    console.log(childPughScore);

    const markup = childPughScore.getMarkup();
    this._pughResult.innerHTML = "";
    this._pughResult.insertAdjacentHTML("beforeend", markup);
  }

  clearChildPugh() {
    this._calcPughForm.reset();
    this._pughResult.innerHTML = "";
    this._calcBoxPugh.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitPughData(handler) {
    this._pughBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearPughForm(handler) {
    this._pughBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Ganzoni Equation
  getGanzoniFeStoresVal() {
    const stores = document.querySelector(
      'input[name="calc-ganzoni-stores"]:checked'
    );
    if (stores.value === "PaedsL") {
      return false;
    } else {
      return true;
    }
  }

  getGanzoniCalculation() {
    const weight = +this._ganzoniWeight.value;
    const targetHb = +this._ganzoniTarget.value;
    const actualHb = +this._ganzoniActual.value;
    const feStores = this.getGanzoniFeStoresVal();

    if (!weight || !targetHb || !actualHb) {
      alert("Please complete all the required fields");
      return;
    }

    const feData = new calc.GanzoniEq(weight, targetHb, actualHb, feStores);
    console.log(feData);

    const markup = feData.getMarkup();
    this._ganzoniResult.innerHTML = "";
    this._ganzoniResult.insertAdjacentHTML("beforeend", markup);
  }

  clearGanzoniForm() {
    this._ganzoniForm.reset();
    this._ganzoniResult.innerHTML = "";
    this._calcGanzoniBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitGanzoniData(handler) {
    this._ganzoniBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearGanzoniForm(handler) {
    this._ganzoniBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Opiate Conversion
  getOpiateConversionData() {
    const fromOpiate = this._opiateFrom.value;
    const fromDose = +this._opiateDose.value;
    const toOpiate = this._opiateTo.value;

    if (!fromDose) {
      alert("Please complete all the required fields");
      return;
    }

    const opiateConv = new calc.OpiateConv(fromOpiate, fromDose, toOpiate);
    console.log(opiateConv);

    const markup = opiateConv.getMarkup();
    this._opiateResult.innerHTML = "";
    this._opiateResult.insertAdjacentHTML("beforeend", markup);
  }

  clearOpiateForm() {
    this._opiateForm.reset();
    this._opiateResult.innerHTML = "";
    this._calcOpiateBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitOpiateData(handler) {
    this._opiateBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearOpiateForm(handler) {
    this._opiateBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // MAP
  getMAPData() {
    const sbp = +this._calcMapSBP.value;
    const dbp = +this._calcMapDBP.value;

    if (!sbp || !dbp) {
      alert("Please complete all the required fields");
      return;
    }

    const data = new calc.mapCalc(sbp, dbp);
    console.log(data);

    const markup = data.insertMarkup();
    this._calcMapResult.innerHTML = "";
    this._calcMapResult.insertAdjacentHTML("beforeend", markup);
  }

  clearMAPForm() {
    this._calcMapForm.reset();
    this._calcMapResult.innerHTML = "";
    this._calcMapBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitMAPData(handler) {
    this._mapBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearMAPForm(handler) {
    this._mapBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Potassium Deficit
  getPotassiumDeficitData() {
    const weight = +this._calcPotassiumWeight.value;
    const potassium = +this._calcPotassiumMeasuredPotassium.value;

    if (!weight || !potassium) {
      alert("Please complete all the required fields");
      return;
    }

    const data = new calc.potassiumCalc(weight, potassium);
    console.log(data);

    const markup = data.insertMarkup();
    this._potassiumDeficitResult.innerHTML = "";
    this._potassiumDeficitResult.insertAdjacentHTML("beforeend", markup);
  }

  clearPotassiumForm() {
    this._calcPotassiumForm.reset();
    this._potassiumDeficitResult.innerHTML = "";
    this._calcPotassiumDeficitBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitPotassiumData(handler) {
    this._potassiumDeficitBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearPotassiumForm(handler) {
    this._potassiumDeficitBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Sodium Correction
  getSodiumData() {
    const sodiumLevel = +this._sodiumSodiumLevel.value;
    const glucoseLevel = +this._sodiumGlucoseLevel.value;

    if (!sodiumLevel || !glucoseLevel) {
      alert("Please complete all the required fields");
      return;
    }

    const sodiumData = new calc.sodiumCalc(sodiumLevel, glucoseLevel);

    console.log(sodiumData);

    const markup = sodiumData.insertMarkup();
    this._sodiumResult.innerHTML = "";
    this._sodiumResult.insertAdjacentHTML("beforeend", markup);
  }

  clearSodiumForm() {
    this._calcSodiumForm.reset();
    this._sodiumResult.innerHTML = "";
    this._calcSodiumBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitSodiumData(handler) {
    this._sodiumBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearSodiumForm(handler) {
    this._sodiumBtnClear.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Calcium Correction
  getCalciumData() {
    const serumCalcium = +this._calciumSerumCalcium.value;
    const serumAlbumin = +this._calciumSerumAlbumin.value;

    if (!serumAlbumin || !serumCalcium) {
      alert("Please complete all the required fields");
      return;
    }

    const calciumData = new calc.calciumCalc(serumCalcium, serumAlbumin);

    console.log(calciumData);
    const markup = calciumData.insertMarkup();
    this._calciumResult.innerHTML = "";
    this._calciumResult.insertAdjacentHTML("beforeend", markup);
  }

  clearCalciumForm() {
    this._calciumForm.reset();
    this._calciumResult.innerHTML = "";
    this._calcCalciumBox.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSubmitCalciumData(handler) {
    this._calciumSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearCalciumForm(handler) {
    this._calciumReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Creatinine Clerance
  _getSelectedCreatinineGender() {
    const gender = document.querySelector(
      'input[name="calculator-creatinine--gender"]:checked'
    );
    return gender ? gender.value : null;
  }

  _getSelectedCreatinineRace() {
    const race = document.querySelector(
      'input[name="calculator-creatinine--race"]:checked'
    );
    return race ? race.value : null;
  }

  _switchUnitPlaceholder(unit) {
    if (+unit === 1) {
      this._creatinineSerumCreatinine.placeholder = "SCr (in μmol/l)";
    } else {
      this._creatinineSerumCreatinine.placeholder = "SCr (in mg/dL)";
    }
  }

  _getDataForCreatinineCalculator() {
    const gender = this._getSelectedCreatinineGender();
    const age = this._creatinineAge.value;
    const dob = this._creatinineDob.value;
    const weight = +this._creatinineWeight.value;
    const serumCreatinine = this._creatinineSerumCreatinine.value;
    const unit = +this._creatinineUnit.value === 0 ? "mg/dL" : null;
    const race = this._getSelectedCreatinineRace();

    if (!gender || !weight || !serumCreatinine) {
      alert("Please complete all the required fields");
      return;
    }

    const data = new calc.creatinineCalc(
      gender,
      age,
      dob,
      weight,
      serumCreatinine,
      unit,
      race
    );
    console.log(data);

    const markup = data.insertMarkup();
    this._creatinineResult.innerHTML = "";
    this._creatinineResult.insertAdjacentHTML("beforeend", markup);
  }

  clearCreatinineForm() {
    this._creatinineForm.reset();
    this._creatinineResult.innerHTML = "";
    this._calcBoxCreatinine.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerSwitchSerumCreatininePlaceholder() {
    this._creatinineUnit.addEventListener("input", () => {
      const unit = this._creatinineUnit.value;
      this._switchUnitPlaceholder(unit);
    });
  }

  handlerCalcCreatinine(handler) {
    this._creatinineBtnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearCreatinineForm(handler) {
    this._creatinineBtnReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // Adjusted Body Weight
  _getSelectedIBWType() {
    const selectedType = document.querySelector(
      'input[name="calculator-IBW--type"]:checked'
    );
    return selectedType ? selectedType.value : null;
  }

  _getSelectedIbwGender() {
    const selectedGender = document.querySelector(
      'input[name="calculator-IBW--gender"]:checked'
    );
    return selectedGender ? selectedGender.value : null;
  }

  getBodyWeightAdjData() {
    const ibwType = this._getSelectedIBWType();
    const ibwGender = this._getSelectedIbwGender();

    if (
      !ibwType ||
      !ibwGender ||
      !this._ibwWeight.value ||
      !this._ibwHeight.value
    ) {
      alert("Please complete all the required fields");
      return;
    }

    const newBodyWeightAdj = new calc.bodyWeightAdjustment(
      ibwType,
      ibwGender,
      this._ibwWeight.value,
      this._ibwHeight.value
    );

    console.log(
      ibwType,
      ibwGender,
      this._ibwWeight.value,
      this._ibwHeight.value
    );

    const markup = newBodyWeightAdj.selectMarkup();
    this._ibwResult.innerHTML = "";
    this._ibwResult.insertAdjacentHTML("beforeend", markup);
  }

  clearIBWForm() {
    this._ibwForm.reset();
    this._ibwResult.innerHTML = "";
    this._calcBoxIbw.scrollTo({ top: 0, behavior: "smooth" });
  }

  handlerCalcBodyWeightAdj(handler) {
    this._ibwSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const ibwType = this._getSelectedIBWType();
      const ibwGender = this._getSelectedIbwGender();

      if (
        ibwType &&
        ibwGender &&
        this._ibwWeight.value &&
        this._ibwHeight.value
      ) {
        handler();
      } else {
        alert("Please complete all the required fields");
      }
    });
  }

  handlerResetBodyWeightAdj(handler) {
    this._ibwReset.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new CalculatorView();
