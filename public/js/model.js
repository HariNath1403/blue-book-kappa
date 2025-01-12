import * as config from "./config.js";
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

// CPG
export const searchFolders = async function (folder, allFiles, query) {
  const results = [];
  try {
    for (const file of allFiles) {
      const filePath = `${folder}/${file}`;
      const response = await fetch(filePath);
      const fileData = await response.json();

      fileData.forEach((no) => {
        const pgNo = no["page_number"];
        const txt = no["text"].toLowerCase();

        if (txt.includes(query)) {
          const snippet = config.getSnippet(txt, query);
          results.push({
            name: file.split(".json")[0],
            text: snippet,
            page: pgNo,
          });
        }
      });
    }
    return results;
  } catch (err) {
    console.error("Error loading or processing the file:", err);
  }
};
