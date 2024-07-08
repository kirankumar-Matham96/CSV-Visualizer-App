// API related functionality
const baseUrl = "http://localhost:3000";
let fileData = {};

const uploadFile = async (data) => {
  try {
    const options = {
      method: "POST",
      headers: [],
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

const getFileData = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/csv/${id}`);
    const readable = await response.json();

    // saving for search filtering
    fileData = readable.file;

    return readable.file;
  } catch (error) {
    console.log(error);
  }
};

// DOM related functionality
document.addEventListener("DOMContentLoaded", async () => {
  // Sorting functions
  function sortAscending(columnName) {
    const sortedData = {};
    sortedData.data = fileData.data
      .slice()
      .sort((a, b) => a[columnName].localeCompare(b[columnName]));
    createFileDisplayContent(sortedData);
  }

  function sortDescending(columnName) {
    const sortedData = {};
    sortedData.data = fileData.data
      .slice()
      .sort((a, b) => b[columnName].localeCompare(a[columnName]));
    createFileDisplayContent(sortedData);
  }

  const files = await getFiles();

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
   * Populates the files list.
   */
  function createFilesList() {
    try {
      fileListEl.innerHTML = "";
      files.map((file) => {
        const fileBtn = document.createElement("button");
        fileBtn.classList.add("btn", "btn-outline-info");
        fileBtn.setAttribute("id", file._id);
        fileBtn.textContent = file.fileName;

        fileBtn.addEventListener("click", async (event) => {
          const id = event.target.getAttribute("id");
          const data = await getFileData(id);
          createFileDisplayContent(data);
        });

        fileListEl.appendChild(fileBtn);
      });
    } catch (error) {
      console.log(error);
    }
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
            const element = `<th scope="col">${row}<button class="btn btn-secondary ms-3 sort-ascending-btn" data-id="${row}"><i class="fa-solid fa-chevron-up"></i></button> <button class="btn btn-secondary sort-descending-btn" data-id="${row}"><i class="fa-solid fa-chevron-down"></i></button> </th>`;
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
          <th scope="row">${index + 1}</th>
          ${headings.map((heading) => `<td>${row[heading]}</td>`).join("")}
        </tr>`
        )
        .join("")}  
    </tbody>
    `;

    // TODO: Need to add a spinner for loading all the content and adding all the listeners

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          const sortAscendingBtns = document.querySelectorAll(
            ".sort-ascending-btn"
          );
          const sortDescendingBtns = document.querySelectorAll(
            ".sort-descending-btn"
          );

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

          observer.disconnect();
        }
      });
    });

    observer.observe(tableEl, { childList: true, subtree: true });
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
