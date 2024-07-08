// API related functionality
let baseUrl = "http://localhost:3000";
// NOTE: comment below line to run it locally
baseUrl = "https://csv-visualizer-app.onrender.com";
let fileData = {};
let fileId = "";
let totalItems = 0;
let currentPage = 1;

const uploadFile = async (data) => {
  try {
    const options = {
      method: "POST",
      headers: {},
      body: data,
    };

    const response = await fetch(`${baseUrl}/api/csv`, options);
    const readable = await response.json();
    return readable;
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/csv`);
    const readable = await response.json();
    return readable.files;
  } catch (error) {
    console.log(error);
  }
};

const getFileData = async (id = fileId, page = 1) => {
  try {
    const response = await fetch(`${baseUrl}/api/csv/${id}?page=${page}`);
    const readable = await response.json();

    totalItems = readable.totalItems;
    // saving for search filtering
    fileData = readable.file;

    return readable.file;
  } catch (error) {
    console.log(error);
  }
};

// DOM related functionality
document.addEventListener("DOMContentLoaded", async () => {
  let myChart;

  // Sorting functions
  function sortAscending(columnName) {
    const sortedData = { data: [] };
    sortedData.data = fileData.data
      .slice()
      .sort((a, b) => a[columnName].localeCompare(b[columnName]));
    createFileDisplayContent(sortedData);
  }

  function sortDescending(columnName) {
    const sortedData = { data: [] };
    sortedData.data = fileData.data
      .slice()
      .sort((a, b) => b[columnName].localeCompare(a[columnName]));
    createFileDisplayContent(sortedData);
  }

  // const files = await getFiles();

  const fileUploadFormEl = document.querySelector(".file-upload-form");
  const fileListEl = document.querySelector(".files-list-container");
  const searchInputEl = document.querySelector("#search-input");
  const tableEl = document.querySelector(".file-data-table-container");

  fileUploadFormEl.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      const file = event.target["file-input"].files[0];
      const fileName = file.name.toLowerCase();
      const isCsv = file.type === "text/csv" || fileName.endsWith(".csv");
      const errorMessageEl = document.querySelector(".error-message");

      if (!isCsv) {
        errorMessageEl.classList.contains("d-none")
          ? errorMessageEl.classList.remove("d-none")
          : null;
      } else {
        errorMessageEl.classList.contains("d-none")
          ? null
          : errorMessageEl.classList.add("d-none");
        formData.append("file", file);
        await uploadFile(formData);
        createFilesList();
      }
    } catch (error) {
      console.log(error);
    }
  });

  /**
   * Generate pagination
   */
  function renderPagination() {
    // let currentPage = 1;

    const totalPages = Math.ceil(totalItems / 100);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      if (i === currentPage) {
        pageItem.classList.add("active");
      }
      const pageLink = document.createElement("a");
      pageLink.classList.add("page-link");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.addEventListener("click", async (event) => {
        event.preventDefault();
        currentPage = i;
        const data = await getFileData(fileId, currentPage);
        createFileDisplayContent(data);
        renderPagination();
      });
      pageItem.appendChild(pageLink);
      paginationContainer.appendChild(pageItem);
    }
  }

  /**
   * Populates the files list.
   */
  async function createFilesList() {
    try {
      fileListEl.innerHTML = "";
      const files = await getFiles();
      files.map((file) => {
        const fileBtn = document.createElement("button");
        fileBtn.classList.add("btn", "btn-outline-info");
        fileBtn.setAttribute("id", file._id);
        fileBtn.textContent = file.fileName;

        fileBtn.addEventListener("click", async (event) => {
          const id = event.target.getAttribute("id");
          fileId = id;
          const data = await getFileData();
          destroyExistingChart();
          createFileDisplayContent(data);
          currentPage = 1;
          renderPagination();
        });

        fileListEl.appendChild(fileBtn);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function destroyExistingChart() {
    // destroying the chart if exists already
    if (myChart) {
      myChart.destroy();
    }
  }

  function displayChart(columnName) {
    const ctx = document.getElementById("myChart").getContext("2d");

    destroyExistingChart();

    const data = fileData.data.map((item) => item[columnName]);

    // creating a new chart
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: fileData.data.map((_, index) => index + 1),
        datasets: [
          {
            label: columnName,
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  function requestAnimationFrame() {
    setTimeout(() => {
      const sortAscendingBtns = document.querySelectorAll(
        ".sort-ascending-btn"
      );
      const sortDescendingBtns = document.querySelectorAll(
        ".sort-descending-btn"
      );
      const chartBtns = document.querySelectorAll(".chart");

      [...sortAscendingBtns].forEach((sortBtn) => {
        sortBtn.addEventListener("click", (event) => {
          sortAscending(event.target.getAttribute("data-id"));
        });
      });

      [...sortDescendingBtns].forEach((sortBtn) => {
        sortBtn.addEventListener("click", (event) => {
          sortDescending(event.target.getAttribute("data-id"));
        });
      });

      [...chartBtns].forEach((chartBtn) => {
        chartBtn.addEventListener("click", (event) => {
          const column =
            event.target.getAttribute("data-col") ||
            event.target.parentElement.getAttribute("data-col");
          displayChart(column);
        });
      });
    }, 200);
  }

  function createFileDisplayContent(fileData) {
    tableEl.innerHTML = "";
    const headings = Object.keys(fileData.data[0]);

    tableEl.innerHTML = `
    <thead>
      <tr>
        <th scope="col">#</th>
        ${headings
          .map((row) => {
            const element = `<th scope="col">${row}<button class="btn btn-success ms-3 chart" data-col="${row}"><i class="fa-solid fa-chart-simple"></i></button><button class="btn btn-secondary ms-3 sort-ascending-btn" data-id="${row}"><i class="fa-solid fa-chevron-up"></i></button> <button class="btn btn-secondary sort-descending-btn" data-id="${row}"><i class="fa-solid fa-chevron-down"></i></button> </th>`;
            return element;
          })
          .join("")}
      </tr>
    </thead>
    <tbody>
      ${fileData.data
        .map(
          (row, index) =>
            `<tr>
          <th scope="row">${index + (currentPage - 1) * 100 + 1}</th>
          ${headings.map((heading) => `<td>${row[heading]}</td>`).join("")}
        </tr>`
        )
        .join("")}  
    </tbody>
    `;

    requestAnimationFrame();
  }

  /**
   * To filter the data.
   * The filter is applied on first column.
   */
  searchInputEl.addEventListener("input", (event) => {
    event.preventDefault();

    const headers = Object.keys(fileData.data[0]);

    const filteredData = {};
    const data = fileData.data.filter((item) => {
      if (
        item[headers[0]]
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        return item;
      }
    });

    filteredData.data = data;
    createFileDisplayContent(filteredData);
  });

  // populating the available files in the list
  createFilesList();
});
