import * as helper from "../config.js";

export class DenverRisk {
  constructor(age, gender, sexual, others, race) {
    this.age = age;
    this.gender = gender;
    this.sexual = sexual;
    this.others = others;
    this.race = race;

    this.pronounce = +this.gender === 0 ? "She" : "He";

    this.calcRisk();
  }

  calcRisk() {
    const score =
      Number(this.age) +
      Number(this.gender) +
      Number(this.sexual) +
      Number(this.others) +
      Number(this.race);

    let risk;
    let prevalence;
    if (score < 20) {
      risk = "Very Low";
      prevalence = "0.31%";
    } else if (score < 30) {
      risk = "Low";
      prevalence = "0.41%";
    } else if (score < 40) {
      risk = "Moderate";
      prevalence = "0.99%";
    } else if (score < 50) {
      risk = "High";
      prevalence = "1.59%";
    } else {
      risk = "Very High";
      prevalence = "3.59%";
    }

    this.score = score;
    this.risk = risk;
    this.prevalence = prevalence;
  }

  getMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>${this.score} points</span>
                <span>${this.risk} Risk</span>
              </div>
              <p class="calculator__result--explaination">
                Client has a Denver score of
                <span class="highlight">${this.score}</span> points. Hence, ${
      this.pronounce === "She" ? "her" : "his"
    } risk
                of being diagnosed with HIV is
                <span class="highlight">${this.risk}</span>. <br />
                ${this.pronounce} has a HIV prevalence of
                <span class="highlight">${this.prevalence}</span>.
              </p>
    `;

    return markup;
  }
}

export class AnticoagulantConv {
  constructor(from, to) {
    this.from = from;
    this.to = to;

    this.instruction = this.getInstruction();
  }

  getInstruction() {
    const anticoagulants = {
      Warfarin: {
        Warfarin: "N/A",
        LMWH: "N/A",
        UFH: "N/A",
        Dabigatran: `Stop Warfarin and start Dabigatran when INR < 2.0`,
        Rivaroxaban: `<strong>AF</strong> - Stop Warfarin and start Rivaroxaban when INR ≤ 3.0 <br /><strong>DVT or PE</strong> - Stop Warfarin and start Rivaroxaban when INR ≤ 2.5`,
        Apixaban: `Stop Warfarin and start Apixaban when INR ≤ 2.0`,
      },
      LMWH: {
        Warfarin: "N/A",
        LMWH: "N/A",
        UFH: "N/A",
        Dabigatran: `Start Dabigatran 0 to 2 hours prior to the time of the next dose of LMWH`,
        Rivaroxaban: `<strong>DVT or PE</strong><br />1. Start Rivaroxaban 0 to 2 hours prior to the next dose of LMWH. <br />2. If patient is in the initial phase (1st 21 days), continue Rivaroxaban 15 mg twice daily for the 1st 21 days, then switch to 20 mg once daily. <br />3. If the patient is on LMWH for more than 21 days, start Rivaroxaban 20 mg once daily 0 to 2 hours before the next dose of LMWH. <br /><br /><strong>Orthopedic Surgery</strong><br />Start Rivaroxaban 0 to 2 hours prior to the next dose of LMWH.`,
        Apixaban: "N/A",
      },
      UFH: {
        Warfarin: "N/A",
        LMWH: "N/A",
        UFH: "N/A",
        Dabigatran: `Start Dabigatran at the time of discontinuation of the continuous Heparin.`,
        Rivaroxaban: "N/A",
        Apixaban: `To be done at the next scheduled dose.`,
      },
      Dabigatran: {
        Warfarin: `<strong>CrCl ≥ 50 mL/min</strong>: Start Warfarin 3 days before discontinuing. <br /><strong>CrCl 30-50 mL/min</strong>: Start Warfarin 2 days before discontinuing. <br /><strong>CrCl 15 - 30 mL/min</strong>: Start Warfarin 1 day before discontinuing.`,
        LMWH: `Start LMWH 12 hours after the last dose of Dabigatran.`,
        UFH: `If CrCl ≥ 30 - wait 12 hours. Else, wait 24 hours after the last dose of Dabigatran before initiating parenteral treatment.`,
        Dabigatran: "N/A",
        Rivaroxaban: "N/A",
        Apixaban: "N/A",
      },
      Rivaroxaban: {
        Warfarin: `One approach is to discontinue Rivaroxaban and begin both a parenteral anticoagulant and Warfarin at the time of the next Rivaroxaban dose.`,
        LMWH: "N/A",
        UFH: "N/A",
        Dabigatran: "N/A",
        Rivaroxaban: "N/A",
        Apixaban: "N/A",
      },
      Apixaban: {
        Warfarin: `1. Continue Apixaban for at least 2 days after beginning Warfarin. <br />2. Check INR on day 2. <br />3. Continue Apixaban and Warfarin until the INR is ≥ 2.0.`,
        LMWH: "N/A",
        UFH: "N/A",
        Dabigatran: "N/A",
        Rivaroxaban: "N/A",
        Apixaban: "N/A",
      },
    };

    return anticoagulants[this.from][this.to];
  }

  getMarkup() {
    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <br />
                <span>${this.from} To ${this.to}</span>
              </div>
              <p class="calculator__result--explaination">
               ${this.instruction}
              </p>
    `;

    return markup;
  }
}

export class warfarinDoseAdj {
  constructor(dose, inr) {
    this.dose = dose;
    this.inr = inr;
  }

  getCurStatus() {
    let minDose;
    let maxDose;
    let recommendationDose;
    let recommendationTca;

    if (this.inr < 1.5) {
      minDose = (1.05 * this.dose).toFixed(1);
      maxDose = (1.2 * this.dose).toFixed(1);
      recommendationDose = "Consider increasing maintenance dose by 5-20%";
      recommendationTca = "Schedule next appointment in 3-7 days";
    } else if (this.inr < 1.8) {
      minDose = (1.05 * this.dose).toFixed(1);
      maxDose = (1.15 * this.dose).toFixed(1);
      recommendationDose = "Consider increasing maintenance dose by 5-15%.";
      recommendationTca = "Schedule the next appointment in 3-7 days.";
    } else if (this.inr < 2) {
      minDose = (1 * this.dose).toFixed(1);
      maxDose = (1.1 * this.dose).toFixed(1);
      recommendationDose =
        "If the two previous INRs were in range, you might consider not making any adjustments to the dose. Consider increasing maintenance dose by 5-10%. Or Consider a single booster of 1.5-2x the daily maintenance dose.";
      recommendationTca = "Schedule the next appointment in 3-7 days.";
    } else if (this.inr <= 3) {
      minDose = (1 * this.dose).toFixed(1);
      maxDose = minDose;
      recommendationDose = "Desired range";
      recommendationTca = "";
    } else if (this.inr < 3.5) {
      minDose = (0.9 * this.dose).toFixed(1);
      maxDose = (1 * this.dose).toFixed(1);
      recommendationDose =
        "If the two previous INRs were in range, you might consider not making any adjustments to the dose. Consider omitting one dose or decreasing maintenance dose by 5-10%.";
      recommendationTca = "Schedule the next appointment in 3-7 days.";
    } else if (this.inr < 4) {
      minDose = (0.85 * this.dose).toFixed(1);
      maxDose = (0.95 * this.dose).toFixed(1);
      recommendationDose =
        "Consider omitting one dose or decreasing maintenance dose by 5-15%.";
      recommendationTca = "Schedule the next appointment in 1-3 days.";
    } else {
      minDose = (0.8 * this.dose).toFixed(1);
      maxDose = (0.95 * this.dose).toFixed(1);
      recommendationDose =
        "Hold warfarin or decrease maintenance dose by 5-20%";
      recommendationTca = "Schedule the next appointment in 1 day.";
    }

    return [minDose, maxDose, recommendationDose, recommendationTca];
  }

  getMarkup() {
    const [minDose, maxDose, recommendationDose, recommendationTca] =
      this.getCurStatus();

    const markup = `
    <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>New Weekly Dose: &mdash;</span>
                <br />
                <span>min: ${minDose} mg</span>
                <span>max: ${maxDose} mg</span>
              </div>
              <p class="calculator__result--explaination">
                Source:
                <a href="https://www.omnicalculator.com/health/warfarin-dosing"
                  >Omnicalculator</a
                >
                <br />
                With a weekly dose of ${this.dose} mg, the INR reading was ${this.inr}. ${recommendationDose}
                <br />
${recommendationTca}
                <br />
                <strong>With an INR &lt; 5.0</strong>
                , for a rapid reversal: Hold wafarin and give vitamin K 1mg IV
                infusion or 2 mg PO. This also applies for
                <span class="highlight"
                  >patients requiring urgent surgery.</span
                >
                <br />
                In an occasion of
                <strong>serious bleeding</strong>, hold warfarin and give
                vitamin K (10 mg slow infusion) and supplement with fresh plasma
                or prothrombin complex concentrate, depending on the urgency of
                the situation.
                <br />
                Recombinant factor VIIa may be considered as an alternative to
                PCC.
                <br />
                Vitamin K can be repeated Q12H.
              </p>
    `;

    return markup;
  }
}

export class ascvdRisk {
  constructor(
    age,
    diabetes,
    sex,
    smoker,
    totalChol,
    hdlChol,
    sbp,
    txHypertension,
    race
  ) {
    this.age = age;
    this.diabetes = diabetes; // 1 = true, 0 = false
    this.sex = sex; // 1 = male, 0 = female
    this.smoker = smoker; // 1 = true, 0 = false
    this.totalChol = totalChol; // in mmol/L
    this.hdlChol = hdlChol; // in mmol/L
    this.sbp = sbp;
    this.txHypertension = txHypertension; // 1 = true, 0 = false
    this.race = race; // 1 = African American, 0 = White/Other

    this.calcRisk();
  }

  calcRisk() {
    // Coefficients for each race-sex group
    const coefficients = {
      whiteMale: {
        ln_age: 12.344,
        ln_tc: 11.853,
        ln_age_ln_tc: -2.664,
        ln_hdl: -7.99,
        ln_age_ln_hdl: 1.769,
        ln_treated_sbp: 1.797,
        ln_untreated_sbp: 1.764,
        smoker: 7.837,
        ln_age_smoker: -1.795,
        diabetes: 0.658,
        baseline_survival: 0.9144,
        mean_coefficient_sum: 61.18,
      },
      whiteFemale: {
        ln_age: -29.799,
        ln_age_squared: 4.884,
        ln_tc: 13.54,
        ln_age_ln_tc: -3.114,
        ln_hdl: -13.578,
        ln_age_ln_hdl: 3.149,
        ln_treated_sbp: 2.019,
        ln_untreated_sbp: 1.957,
        smoker: 7.574,
        ln_age_smoker: -1.665,
        diabetes: 0.661,
        baseline_survival: 0.9665,
        mean_coefficient_sum: -29.18,
      },
      africanAmericanMale: {
        ln_age: 2.469,
        ln_tc: 0.302,
        ln_hdl: -0.307,
        ln_treated_sbp: 1.916,
        ln_untreated_sbp: 1.809,
        smoker: 0.549,
        diabetes: 0.645,
        baseline_survival: 0.8954,
        mean_coefficient_sum: 19.54,
      },
      africanAmericanFemale: {
        ln_age: 17.114,
        ln_tc: 0.94,
        ln_hdl: -18.92,
        ln_treated_sbp: 29.291,
        ln_untreated_sbp: 27.82,
        smoker: 0.691,
        diabetes: 0.874,
        baseline_survival: 0.9533,
        mean_coefficient_sum: 86.61,
      },
    };

    // Select coefficients based on race and sex
    let coeff;
    if (this.race === 0 && this.sex === 1) coeff = coefficients.whiteMale;
    else if (this.race === 0 && this.sex === 0)
      coeff = coefficients.whiteFemale;
    else if (this.race === 1 && this.sex === 1)
      coeff = coefficients.africanAmericanMale;
    else if (this.race === 1 && this.sex === 0)
      coeff = coefficients.africanAmericanFemale;
    else throw new Error("Invalid race or sex input");

    // Convert mmol/L to mg/dL
    const totalChol_mg = this.totalChol * 38.67;
    const hdlChol_mg = this.hdlChol * 38.67;

    // Calculate natural logarithms
    const ln_age = Math.log(this.age);
    const ln_tc = Math.log(totalChol_mg);
    const ln_hdl = Math.log(hdlChol_mg);
    const ln_sbp = Math.log(this.sbp);

    // Calculate terms
    const terms = {
      ln_age: coeff.ln_age * ln_age,
      ln_tc: coeff.ln_tc * ln_tc,
      ln_age_ln_tc: coeff.ln_age_ln_tc
        ? coeff.ln_age_ln_tc * ln_age * ln_tc
        : 0,
      ln_hdl: coeff.ln_hdl * ln_hdl,
      ln_age_ln_hdl: coeff.ln_age_ln_hdl
        ? coeff.ln_age_ln_hdl * ln_age * ln_hdl
        : 0,
      sbp: this.txHypertension
        ? coeff.ln_treated_sbp * ln_sbp
        : coeff.ln_untreated_sbp * ln_sbp,
      smoker: coeff.smoker * this.smoker,
      ln_age_smoker: coeff.ln_age_smoker
        ? coeff.ln_age_smoker * ln_age * this.smoker
        : 0,
      diabetes: coeff.diabetes * this.diabetes,
      ln_age_squared: coeff.ln_age_squared
        ? coeff.ln_age_squared * ln_age ** 2
        : 0,
    };

    // Sum all terms
    const individualSum = Object.values(terms).reduce(
      (acc, val) => acc + val,
      0
    );

    // Calculate risk
    const risk =
      1 -
      Math.pow(
        coeff.baseline_survival,
        Math.exp(individualSum - coeff.mean_coefficient_sum)
      );

    // Convert risk to percentage
    this.risk = (risk * 100).toFixed(2);
  }

  getMarkup() {
    const markup = `
     <h3 class="calculator__result--header">Result</h3>
              <div
                class="calculator__result--jombotron calculator__result--jombotron--small"
              >
                <span>${this.risk}%</span>
              </div>
              <p class="calculator__result--explaination">
                Risk of cardiovascular event (coronary or stroke death or
                non-fatal MI or stroke) in <span class="highlight">next 10 years</span>
                 is
                <span class="highlight">${this.risk}%</span>.
                <br />
                While the score was developed and validated in a large population, several studies have suggested that the risk calculator substantially over-estimates 10-year risk. (Some studies have suggested that its risk estimates are accurate.)
                <br />
Statins are highly emphasized in the guidelines and recommendations, but lifestyle modifications are likely just as - if not more - important to ASCVD risk.
              </p>
    `;
    return markup;
  }
}

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
