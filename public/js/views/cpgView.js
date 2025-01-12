import * as config from "../config.js";

class CpgView {
  _cpgForm = document.querySelector(".cpg__form");
  _queryInput = document.querySelector(".cpg__search--input");
  _queryClearBtn = document.querySelector(".cpg__search--clear");
  _querySearchFolderBtn = document.querySelector(".cpg__btn");
  _exitResultsPageBtn = document.querySelector(".cpg__results--exit");

  _cpgResultsPage = document.querySelector(".cpg__results");
  _cpgFilterBox = document.querySelector(".cpg__filter");
  _cpgFilterList = document.querySelector(".cpg__filter--list");
  _cpgResultsBox = document.querySelector(".cpg__results--box");
  _allCpgCards = document.querySelectorAll(".cpg__results--card");

  exitResultPage() {
    this._cpgResultsPage.style.transform = "translateX(100%)";
    this._cpgForm.reset();
  }

  loadSearchResultsPage() {
    this._queryInput.value = "";
    this._cpgFilterList.innerHTML = "";
    this._cpgResultsBox.innerHTML = "";
    this._cpgResultsPage.style.transform = "translateX(0)";
  }

  getMarkupResultsBox(result) {
    const allMarkups = [];
    result.forEach((no) => {
      const file = no.name;
      const txt = no.text;
      const pg = no.page;
      const markup = `
    <figure
                class="cpg__results--card"
                data-location="${file}#${pg}"
              >
                <h2 class="cpg__results--card--file">
                  ${file}
                </h2>

                <p class="cpg__results--card--txt">
                 ${txt}
                </p>
                <h3 class="cpg__results--card--page">Page ${pg}</h3>
              </figure>
    `;
      allMarkups.push(markup);
    });

    return allMarkups.join("");
  }

  generateMarkupForFilter(uniqueFiles) {
    const allMarkups = [];
    uniqueFiles.forEach((file) => {
      const markup = `
<li class="cpg__filter--file">
                  <span class="cpg__filter--file--name"
                    >${file}</span
                  >
                  <button class="cpg__filter--file--btn">X</button>
                </li>
`;

      allMarkups.push(markup);
    });

    return allMarkups.join("");
  }

  initiateSearch(folder, queryStr) {
    if (queryStr.length < 5) {
      alert("A min of 5 chracters is needed in the query input field.");
      return ["", "", ""];
    }
    if (folder === "nag") {
      this._queryInput.value = "";
      this.launchNAG();
      return ["", "", ""];
    }

    const folderPath = `../guidelines/${folder}`;
    const cpgFiles = config.cpgs[folder];
    const query = queryStr.toLowerCase();

    return [folderPath, cpgFiles, query];
  }

  transferDataToTemplate(results) {
    if (results.length < 1) {
      const markup = `<p class="cpg__results--empty">
                 404 ERROR: NO RESULTS FOUND.
                </p>`;
      this.loadSearchResultsPage();

      return this._cpgResultsBox.insertAdjacentHTML("beforeend", markup);
    }

    const unique = [];
    results.forEach((no) => {
      const file = no.name;
      if (unique.indexOf(file) === -1) {
        unique.push(file);
      }
    });

    const filterBoxItems = this.generateMarkupForFilter(unique);
    const resultBoxResults = this.getMarkupResultsBox(results);

    this.loadSearchResultsPage();
    this._cpgFilterList.insertAdjacentHTML("beforeend", filterBoxItems);
    this._cpgResultsBox.insertAdjacentHTML("beforeend", resultBoxResults);

    this._cpgResultsBox.scrollTo(0, 0);
  }

  getTargetFileLocation(file, location) {
    const filePath = `${file}.json`;
    let folder;

    for (const category in config.cpgs) {
      if (config.cpgs[category].includes(filePath)) {
        folder = category;
      }
    }
    const fullPath = `${folder}/${file}.pdf`;

    return [fullPath, location];
  }

  launchNAG() {
    const url = config.nagUrl;
    window.open(url, "_blank");
  }
  /*
  async launchPdfDoc(path, page) {
    const url = `../../guidelines-old/${path}`;
    window.open(`${url}#page=${page}`, "_blank");
  }
  launchPdfDoc(path, page) {
    /*
    const url = `../guidelines-old/${path}#page=${page}`;
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "600px";
    document.body.appendChild(iframe);

    // ////////
    const url = `../../guidelines-old/${path}`;

    console.log(url);

    // Initialize the PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise
      .then(function (pdf) {
        if (page < 1 || page > pdf.numPages) {
          console.error("Invalid page number");
          return;
        }

        pdf.getPage(page).then(function (page) {
          const scale = 1;
          const viewport = page.getViewport({ scale: scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          document.body.appendChild(canvas);

          page.render({ canvasContext: context, viewport: viewport });
        });
      })
      .catch(function (error) {
        console.error("Error loading PDF:", error);
      });
  }
  */

  insertSpinner() {
    const spinner = `<div class="cpg__results--box--spinner">
                <div class="cpg__results--box--spinner--icon"></div>
              </div>`;
    this._cpgResultsBox.insertAdjacentHTML("beforebegin", spinner);
  }

  removeSpinner() {
    const spinner = document.querySelector(".cpg__results--box--spinner");
    if (spinner) {
      spinner.remove();
    }
  }

  updateResultsAfterFilter(results) {
    this._cpgResultsBox.innerHTML = "";

    if (results.length < 1) {
      const markup = `<p class="cpg__results--empty">
               404 ERROR: NO RESULTS FOUND.
              </p>`;
      this.loadSearchResultsPage();

      return this._cpgResultsBox.insertAdjacentHTML("beforeend", markup);
    }

    const resultBoxResults = this.getMarkupResultsBox(results);

    this._cpgResultsBox.insertAdjacentHTML("beforeend", resultBoxResults);

    this._cpgResultsBox.scrollTo(0, 0);
  }

  filterSearchDict(dict, file) {
    const filtered = dict.filter((no) => no.name !== file);

    return filtered;
  }

  handlerSearchFolder(handler) {
    this._querySearchFolderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const folder = document.querySelector(
        'input[name="cpg-category"]:checked'
      ).value;
      const queryStr = this._queryInput.value;

      handler(folder, queryStr);
    });
  }

  handlerSubmitQuery(handler) {
    this._queryInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const folder = document.querySelector(
          'input[name="cpg-category"]:checked'
        ).value;
        const queryStr = this._queryInput.value;

        handler(folder, queryStr);
      }
    });
  }

  handlerClearFilterBtn(handler) {
    this._cpgFilterList.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("cpg__filter--file--btn")) {
        e.preventDefault();

        this.insertSpinner();
        const target = e.target.closest(".cpg__filter--file");

        const fileName = target.querySelector(
          ".cpg__filter--file--name"
        ).textContent;

        target.innerHTML = "";
        target.style.display = "none";

        handler(fileName);
      }
    });
  }

  handlerGetTargetLocation(handler) {
    this._cpgResultsBox.addEventListener("click", (e) => {
      const target = e.target.closest(".cpg__results--card");

      if (target) {
        const dataLocation = target.getAttribute("data-location");

        const [file, page] = dataLocation.split("#");
        handler(file, page);
      }
    });
  }

  handlerExitResults(handler) {
    this._exitResultsPageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  handlerClearQueryInput() {
    this._queryClearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._queryInput.value = "";
    });
  }
}

export default new CpgView();
