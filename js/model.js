// FORMULARY
export let allData;
export const allDrugs = [];

export const loadApiData = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allData = [...data];
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const loadFormularySearch = function (str) {
  const matchArr = [...allDrugs];
  const filteredArr = matchArr.filter((drug) =>
    drug.toLowerCase().includes(str.toLowerCase())
  );
  return filteredArr;
};

export const getTargetDrugInfo = function (drug) {
  const target = allData.find((obj) => obj["Generic"] === drug);

  console.log(target);
  return target;
};

// CALCULATOR
export const transferDataToCalcDict = function (ids, headers, subs) {
  const calculatorDict = {
    id: [],
    header: [],
    subHeader: [],
  };

  for (let i = 0; i < ids.length; i++) {
    calculatorDict.id.push(ids[i]);
    calculatorDict.header.push(headers[i]);
    calculatorDict.subHeader.push(subs[i]);
  }

  return calculatorDict;
};
