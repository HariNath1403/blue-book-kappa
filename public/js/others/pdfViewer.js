// This function is triggered from the controller by passing the file path and starting page
const loadPdfFile = function (pdfFilePath, startPage) {
  const loadingTask = pdfjsLib.getDocument(pdfFilePath);

  loadingTask.promise
    .then((pdf) => {
      console.log("PDF loaded");

      const totalPages = pdf.numPages;
      const pagesToLoad = 5; // Load 5 pages starting from startPage
      const endPage = Math.min(startPage + pagesToLoad - 1, totalPages);

      const viewer = document.getElementById("pdf-viewer");
      viewer.innerHTML = ""; // Clear previous pages if any

      // Loop through and render each page
      for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const pageDiv = document.createElement("div");
        pageDiv.classList.add("pdf-page");
        viewer.appendChild(pageDiv);

        // Fetch each page
        pdf.getPage(pageNum).then((page) => {
          console.log("Page " + pageNum + " loaded");

          const scale = 0.9; // Adjust this to control zoom
          const viewport = page.getViewport({ scale });

          // Create a canvas for rendering the page
          const canvas = document.createElement("canvas");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const context = canvas.getContext("2d");
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);

          // Append the canvas to the page div
          pageDiv.appendChild(canvas);
        });
      }
    })
    .catch((error) => {
      console.error("Error loading PDF:", error);
    });
};
