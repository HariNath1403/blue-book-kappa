import * as helper from "../config.js";

/*
class ASCVDRisk {
  constructor(
    age,
    diabetes,
    sex,
    smoker,
    totalCholMMOL, // Total cholesterol in mmol/L
    hdlCholMMOL, // HDL cholesterol in mmol/L
    sbp,
    txHypertension
  ) {
    this.age = age;
    this.diabetes = diabetes;
    this.sex = sex;
    this.smoker = smoker;
    this.totalCholMMOL = totalCholMMOL; // Total Cholesterol in mmol/L
    this.hdlCholMMOL = hdlCholMMOL; // HDL Cholesterol in mmol/L
    this.sbp = sbp; // Systolic Blood Pressure in mmHg
    this.txHypertension = txHypertension; // Treated Hypertension (0 or 1)
  }

  calcRisk() {
    // Coefficients for Male and Female (based on Goff et al., 2014)
    const maleConstants = {
      intercept: -29.7997,
      age: 0.0221,
      totalChol: 0.0274,
      hdlChol: -0.0196,
      sbp: 0.0145,
      diabetes: 0.3024,
      smoker: 0.3005,
      txHypertension: 0.1302,
    };
    const femaleConstants = {
      intercept: -29.7997,
      age: 0.0215,
      totalChol: 0.0225,
      hdlChol: -0.0273,
      sbp: 0.0132,
      diabetes: 0.3511,
      smoker: 0.3851,
      txHypertension: 0.1461,
    };

    // Check if cholesterol values are valid numbers before converting
    if (isNaN(this.totalCholMMOL) || isNaN(this.hdlCholMMOL)) {
      console.error(
        "Invalid cholesterol values:",
        this.totalCholMMOL,
        this.hdlCholMMOL
      );
      return "Invalid cholesterol values!";
    }

    // Convert total cholesterol and HDL from mmol/L to mg/dL
    const totalChol = this.totalCholMMOL * 38.67;
    const hdlChol = this.hdlCholMMOL * 38.67;

    // Debugging: Output the converted values to ensure correct conversion
    console.log("Converted Total Cholesterol (mg/dL):", totalChol);
    console.log("Converted HDL Cholesterol (mg/dL):", hdlChol);

    // Choose constants based on sex
    const constants = this.sex === "Male" ? maleConstants : femaleConstants;

    // Log intermediate values for debugging
    console.log("Age:", this.age);
    console.log("Total Cholesterol (mg/dL):", totalChol);
    console.log("HDL Cholesterol (mg/dL):", hdlChol);
    console.log("Systolic BP (mmHg):", this.sbp);
    console.log("Diabetes:", this.diabetes);
    console.log("Smoker:", this.smoker);
    console.log("Treated Hypertension:", this.txHypertension);

    // Calculate the logit score using the formula
    const logit =
      constants.intercept +
      constants.age * this.age +
      constants.totalChol * totalChol +
      constants.hdlChol * hdlChol +
      constants.sbp * this.sbp +
      constants.diabetes * this.diabetes +
      constants.smoker * this.smoker +
      constants.txHypertension * this.txHypertension;

    // Debugging: Output the logit value to check its magnitude
    console.log("Logit Value:", logit);

    // Check if logit is too extreme (adjust if needed)
    if (logit > 30) {
      console.log("Logit is extremely high, risk is close to 100%");
      return 100;
    } else if (logit < -30) {
      console.log("Logit is extremely low, risk is close to 0%");
      return 0;
    }

    // Convert the logit score to a probability using the logistic function
    const risk = 1 / (1 + Math.exp(-logit)); // Logistic function to convert logit to probability

    // Debugging: Output the risk probability before converting to percentage
    console.log("Calculated Risk Probability:", risk);

    // Convert to percentage
    return Math.round(risk * 100);
  }
}

// Test with the same data
const riskCalc = new ASCVDRisk(
  50, // age
  1, // diabetes (1 = yes, 0 = no)
  "Male", // sex
  1, // smoker (1 = yes, 0 = no)
  5.0, // totalChol (mmol/L) (typical for healthy range)
  1.2, // hdlChol (mmol/L) (typical for healthy range)
  120, // sbp (systolic blood pressure)
  0 // txHypertension (1 = treated, 0 = untreated)
);

console.log("ASCVD Risk:", riskCalc.calcRisk() + "%"); // Output the final risk
*/

export class ChildPugh {
  constructor(score) {
    this.score = score;
  }

  getAnalysis() {
    let childClass;
    let expectancy;
    let mortality;

    if (this.score < 7) {
      childClass = "A";
      expectancy = "15-20";
      mortality = "10%";
    } else if (this.score < 10) {
      childClass = "B";
      expectancy = "4-14";
      mortality = "30%";
    } else {
      childClass = "C";
      expectancy = "1-3";
      mortality = "80%";
    }

    return [childClass, expectancy, mortality];
  }

  getMarkup() {
    const [childClass, expectancy, mortality] = this.getAnalysis();

    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>${this.score} points</span>
              </div>
              <p class="calculator__result--explaination">
                &mdash; Child Class ${childClass}
                <br />
                &mdash; Life Expectancy : ${expectancy} years
                <br />
                &mdash; Abdominal peri-operative mortality : ${mortality}
                <br />
                <br />
                <span class="highlight">Calculating</span> the Child-Pugh Score
                helps assess the severity of chronic liver disease, particularly
                <span class="highlight">cirrhosis</span> and provides a
                standardized way to estimate prognosis and guide clinical
                decision-making.
              </p>
    `;

    return markup;
  }
}

export class GanzoniEq {
  constructor(weight, target, actual, feStores) {
    this.weight = weight;
    this.target = target;
    this.actual = actual;
    this.feStores = feStores;

    this.getFeDeficit();
  }

  getFeDeficit() {
    const stores = this.feStores ? 500 : 15 * this.weight;
    this.deficit = this.weight * (this.target - this.actual) * 2.4 + stores;
  }

  getMarkup() {
    const markup = `
     <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Calculated Fe Deficit</span>
                <span>= ${this.deficit.toFixed(1)} mg</span>
              </div>
              <p class="calculator__result--explaination">
                Iron supplementation is needed for iron deficiency anemia (IDA)
                because iron is essential for producing hemoglobin, which
                carries oxygen in the blood. Without enough iron, the body can't
                produce enough healthy red blood cells, leading to fatigue and
                weakness.<br />
                <br />
                Pregnant women are more prone to IDA due to increased iron
                demands for both their own blood volume and the developing
                fetus. Insufficient iron during pregnancy can lead to
                complications like preterm birth and low birth weight, making
                iron supplementation crucial.
              </p>
    `;

    return markup;
  }
}

export class OpiateConv {
  constructor(from, dose, to) {
    this.from = from;
    this.fromDose = dose;
    this.to = to;

    this.getEquivalents();
  }

  getEquivalents() {
    const opiateEquivalents = {
      "morphine-oral": 30,
      "morphine-parenteral": 10,
      "buprenorphine-sl": 0.4,
      "buprenorphine-parenteral": 0.3,
      "codeine-oral": 200,
      "codeine-parenteral": 100,
      "fentanyl-parenteral": 0.1,
      "hydrocodone-oral": 30,
      "hydromorphone-parenteral": 1.5,
      "hydromorphone-oral": 7.5,
      "meperidine-oral": 300,
      "meperidine-parenteral": 100,
      "oxycodone-oral": 20,
      "oxycodone-parenteral": 10,
      "oxymorphone-parenteral": 1,
      "oxymorphone-oral": 10,
      "tramadol-oral": 120,
      "tramadol-parenteral": 100,
    };

    this.fromEquivalent = opiateEquivalents[this.from];
    this.toEquivalent = opiateEquivalents[this.to];
  }

  calcNewDose() {
    const toDose = (this.fromDose * this.toEquivalent) / this.fromEquivalent;

    if (toDose < 1) {
      return toDose.toFixed(2);
    } else {
      return toDose.toFixed(0);
    }
  }

  formatOpiateName(drugRoute) {
    const [drug, route] = drugRoute.split("-");

    const capitalize = (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const formattedDrug = capitalize(drug);
    const formattedRoute = capitalize(route);

    return `${formattedDrug} (${formattedRoute})`;
  }

  getMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Approximate Dose:</span>
                <span>${this.calcNewDose()} mg</span>
              </div>
              <p class="calculator__result--explaination">
                <span class="calculator__result--explaination--highlight"
                  >${this.fromDose} mg of ${this.formatOpiateName(
      this.from
    )}</span
                >
                is approximately <strong>EQUIVALENT</strong> to
                <span class="calculator__result--explaination--highlight"
                  >${this.calcNewDose()} mg of ${this.formatOpiateName(
      this.to
    )}</span
                >.
                <br />
                Advice:
                <br />
                &mdash; Opiates vary widely in terms of potency. Always double
                check doses and units.
                <br />
                &mdash;
                <span class="calculator__result--explaination--highlight"
                  >Decreasing the dose of the new opiate by 33-50%</span
                >
                is strongly recommended unless the patient is in severe
                uncontrolled pain on the current regimen.
                <br />
                &mdash; Consultation with a pain management physician or
                pharmacist is recommended if converting to and from multiple
                opiates or from fentaNYL.
              </p>
    `;

    return markup;
  }
}

export class mapCalc {
  constructor(sbp, dbp) {
    this.sbp = sbp;
    this.dbp = dbp;

    this.getMap();
  }

  getMap() {
    this.map = this.dbp + (this.sbp - this.dbp) / 3;
  }

  insertMarkup() {
    const markup = `
     <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Mean Arterial Pressure</span>
                <span>${this.map.toFixed(2)} mmHg</span>
              </div>
              <p class="calculator__result--explaination">
                Patient with systolic blood pressure of ${
                  this.sbp
                } mmHg and a diastolic
                blood pressure of ${
                  this.dbp
                } mmHg has a Mean Arterial Pressure (MAP) of
                ${this.map.toFixed(2)} mmHg.
                <br />
                MAP is calculated because it represents the average pressure in
                the arteries during one cardiac cycle (both systole and
                diastole).
                <br />
                It is a critical parameter in assessing
                <span class="calculator__result--explaination--highlight">organ perfusion</span> and determining whether blood
                flow to vital organs is adequate.
                <br />
                1. Monitoring critical conditions (in ICU)
                <br />
                2. Guides fluid management, vasopressor use, or antihypertensive
                treatments
                <br />
                3. Assessing shock / sepsis & evaluate cardiovascular health
              </p>
    `;

    return markup;
  }
}

export class potassiumCalc {
  constructor(weight, potassium) {
    this.weight = weight;
    this.potassium = potassium;

    this.getPotassiumDeficit();
  }

  getPotassiumDeficit() {
    const normalK = 4;

    this.deficit = (normalK - this.potassium) * this.weight * 0.4;
  }

  insertMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Potassium Deficit:</span>
                <span>${this.deficit.toFixed(1)} mmol/L</span>
              </div>
              <p class="calculator__result--explaination">
                Potassium deficit is calculated to estimate the amount of
                potassium that needs to be replaced in patients with
                <span class="calculator__result--explaination--highlight">hypokalemia</span>. This is critical for the following
                reasons:
                <br />
                &mdash; Prevent complications of hypokalemia: Low potassium
                levels can cause life-threatening arrhythmias, muscle weakness,
                and other complications.
                <br />
                &mdash; Guide potassium replacement therapy: Helps clinicians
                determine how much potassium to administer safely, either orally
                or intravenously.
                <br />
                &mdash; Total body depletion: Serum potassium levels only
                reflect a small portion of total body potassium, as most
                potassium is intracellular.
                <br />
                <strong>NOTE: </strong> Careful monitoring is required during
                potassium replacement, especially if the patient has impaired
                kidney function or is on medications like ACE inhibitors or
                potassium-sparing diuretics, which increase the risk of
                hyperkalemia.
              </p>
    `;
    return markup;
  }
}

export class sodiumCalc {
  constructor(sodium, glucose) {
    this.sodium = sodium;
    this.glucose = glucose;

    this.getCorrectedSodium();
  }

  getCorrectedSodium() {
    this.corrected = this.sodium + 0.288 * (this.glucose - 5.5);
  }

  insertMarkup() {
    const markup = `
     <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Corrected sodium level:</span>
                <span>${this.corrected.toFixed(2)} mmol/L</span>
              </div>
              <p class="calculator__result--explaination">
                Corrected sodium is calculated in patients with hyperglycemia
                because elevated blood glucose levels cause translocation of
                water from the intracellular to the extracellular space. This
                dilution effect can falsely lower the sodium concentration
                measured in the blood. <br />
                <span class="calculator__result--explaination--highlight">Key reasons</span> for calculating corrected sodium:
                <br />
                &mdash; Assess true sodium status: It helps in determining the
                actual sodium level to guide appropriate treatment.
                <br />
                &mdash; Avoid overcorrection: Misinterpreting hyponatremia (low
                sodium) may lead to overtreatment, which can be dangerous.
                <br />
                &mdash; Guide fluid therapy: Knowing the corrected sodium helps
                tailor fluid management in hyperglycemic crises like diabetic
                ketoacidosis (DKA) or hyperosmolar hyperglycemic state (HHS).
              </p>
    `;

    return markup;
  }
}

export class calciumCalc {
  constructor(calcium, albumin) {
    this.calcium = calcium;
    this.albumin = albumin;

    this.getCorrectedCalcium();
  }

  getCorrectedCalcium() {
    this.corrected = this.calcium + 0.02 * (40 - this.albumin);
  }

  insertMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>Corrected calcium level:</span>
                <span>${this.corrected.toFixed(2)} mmol/L</span>
              </div>
              <p class="calculator__result--explaination">
                Albumin is a protein in the blood that binds calcium, meaning
                that a significant portion of the total calcium is carried
                around by albumin. If albumin levels are low (hypoalbuminemia),
                the total calcium level might be low even though the level of
                free, biologically active calcium is normal.
              </p>
    `;
    return markup;
  }
}

export class creatinineCalc {
  constructor(gender, age, dob, weight, scr, slider, race) {
    this.gender = gender;
    this.age = age;
    this.dob = dob;
    this.weight = weight;
    this.scr = scr;
    this.unit = slider;
    this.race = race;

    this.calcAge();
    this.creatinineClearance = this.getResult(this.unit);
    this.gfr = this.getEGFR(this.unit);
  }

  calcAge() {
    if (!this.age) {
      this.calcAge = helper.calculateAge(this.dob);
    } else {
      this.calcAge = +this.age;
    }
  }

  getResult(unit) {
    let sexFactor;
    let scrConv;
    let nominatorCrCl;
    let denominatorCrCl;

    if (unit === "mg/dL") {
      scrConv = +this.scr * 88.4;
    } else {
      scrConv = +this.scr;
    }
    sexFactor = this.gender === "Male" ? 1.23 : 1.04;
    nominatorCrCl = (140 - this.calcAge) * this.weight * sexFactor;
    denominatorCrCl = scrConv;

    return nominatorCrCl / denominatorCrCl;
  }

  getEGFR(unit) {
    let scrConv;
    let sexFactor;
    let raceFactor;
    let gfr;

    if (unit === "mg/dL") {
      scrConv = +this.scr * 88.4;
    } else {
      scrConv = +this.scr;
    }
    sexFactor = this.gender === "Male" ? 1 : 1.212;
    raceFactor = this.race === "African" ? 1.159 : 1;
    gfr =
      175 *
      (scrConv / 88.4) ** -1.154 *
      this.calcAge ** -0.203 *
      sexFactor *
      raceFactor;

    return gfr;
  }

  getCKDStages(no) {
    if (no >= 90) {
      return ["Stage 1", "Normal or Proteinuria (but normal GFR)"];
    } else if (no >= 60) {
      return ["Stage 2", "Kidney damage without symptoms"];
    } else if (no >= 45) {
      return [
        "Stage 3A",
        "Kidney function starts declining but no severe symptoms yet",
      ];
    } else if (no >= 30) {
      return [
        "Stage 3B",
        "Significant loss of kidney function, with emerging symptoms (e.g., fluid retention, hypertension)",
      ];
    } else if (no >= 15) {
      return [
        "Stage 4",
        "Significantly impaired — potential for complications (e.g. hyperkalemia, anemia)",
      ];
    } else {
      return ["Stage 5", "ESRD — requiring dialysis or kidney transplant"];
    }
  }

  insertMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>CrCl = ${this.creatinineClearance.toFixed(
                  0
                )} ml/min</span>
                <span>eGFR = ${this.gfr.toFixed(
                  0
                )} ml/min/1.73 m<sup>2</sup></span>
              </div>
              <p class="calculator__result--explaination">
                The patient's CrCl is ${this.creatinineClearance.toFixed(
                  1
                )} mL/min, AND the patient's eGFR is ${this.gfr.toFixed(
      1
    )} mL/min/1.73 m²,
                which correlates with CKD ${
                  this.getCKDStages(
                    (this.creatinineClearance + this.gfr) / 2
                  )[0]
                } &mdash; ${
      this.getCKDStages((this.creatinineClearance + this.gfr) / 2)[1]
    }.<br /><br />
                <strong>Creatinine Clearance (CrCl)</strong> is used for
                individualized drug dosing in clinical practice. Commonly used
                for patients on medications that require renal adjustment (e.g.
                aminoglycosides, digoxin). <br />
                <strong>Estimated Glomerular Filtration Rate (EGFR)</strong> is
                used for diagnosing and staging CKD (e.g. CKD stages 1-5). Aids
                in determining the need for dialysis or transplantation.
              </p>
    `;

    return markup;
  }
}

export class bodyWeightAdjustment {
  constructor(type, gender, weight, height) {
    this.type = type;
    this.gender = gender;
    this.weight = +weight;
    this.height = +height;

    this.calcBMI();
    this.calcIBW();
  }

  calcIBW() {
    const genderF = this.gender === "Female" ? 45.5 : 50;
    this.ibw = genderF + 0.9 * (this.height - 152);
  }

  calcABW() {
    const abw = this.ibw + 0.4 * (this.weight - this.ibw);
    return abw;
  }

  calcBMI() {
    const convHeight = this.height / 100;
    this.bmi = (this.weight / convHeight ** 2).toFixed(1);
  }

  selectBMIStatus() {
    if (this.bmi < 18.5) {
      return "Underweight";
    } else if (this.bmi < 24.9) {
      return "Normal";
    } else if (this.bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }
  selectMarkup() {
    let markup;
    if (this.type === "IBW") {
      markup = this.ibwMarkup();
    } else if (this.type === "ABW") {
      markup = this.abwMarkup();
    } else {
      markup = this.bmiMarkup();
    }
    return markup;
  }

  ibwMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div class="calculator__result--jombotron">
                <span id="calculator-IBW--type--result">IBW = ${this.ibw.toFixed(
                  1
                )} kg</span>
              </div>
              <p class="calculator__result--explaination">
                Patient with Weight = ${this.weight.toFixed(
                  1
                )} kg and Height = ${this.height.toFixed(
      1
    )} cm has an IBW of ${this.ibw.toFixed(
      1
    )} kg.<br /><br /><strong>Ideal Body Weight (IBW)</strong> is used for drug dosing, nutritional assessment, and as a baseline for calculating metabolic needs. It helps determine a "healthy" weight based on height and gender to guide treatment and management. IBW assumes average muscle mass and minimal body fat for standardization.
              </p>`;

    return markup;
  }

  abwMarkup() {
    const abw = this.calcABW();

    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div class="calculator__result--jombotron">
                <span id="calculator-IBW--type--result">ABW = ${abw.toFixed(
                  1
                )} kg</span>
              </div>
              <p class="calculator__result--explaination">
                Patient with Weight = ${this.weight.toFixed(
                  1
                )} kg and Height = ${this.height.toFixed(
      1
    )} cm has an ABW of ${abw.toFixed(
      1
    )} kg.<br /><br /><strong>Adjusted Body Weight (ABW)</strong> is used for drug dosing, renal function assessment, and estimating nutritional needs in obese patients. It accounts for lean body mass while minimizing overestimation from excess adipose tissue. ABW balances IBW and actual weight for more accurate calculations.
              </p>`;

    return markup;
  }

  bmiMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div class="calculator__result--jombotron">
                <span id="calculator-IBW--type--result">BMI = ${this.bmi}</span>
              </div>
              <p class="calculator__result--explaination">
                Patient with Weight = ${this.weight.toFixed(
                  1
                )} kg and Height = ${this.height.toFixed(1)} cm has a BMI of ${
      this.bmi
    }. Thus, ${
      this.gender === "Female" ? "she" : "he"
    } is ${this.selectBMIStatus()}. <br /><br /><strong>Body Mass Index (BMI)</strong> is a simple measure of weight relative to height, used to categorize individuals as underweight, normal weight, overweight, or obese. It helps assess potential health risks and guide interventions. While widely used, it does not account for factors like muscle mass or fat distribution.
              </p>`;

    return markup;
  }
}
