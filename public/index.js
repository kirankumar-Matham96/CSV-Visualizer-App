// API related functionality
const baseUrl = "http://localhost:3000";

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
    return readable.file;
  } catch (error) {
    console.log(error);
  }
};

// DOM related functionality
document.addEventListener("DOMContentLoaded", async () => {
  const files = await getFiles();

  const fileUploadFormEl = document.querySelector(".file-upload-form");
  const fileListEl = document.querySelector(".files-list-container");
  const tableEl = document.querySelector(".file-data-table-container");

  fileUploadFormEl.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", event.target["file-input"].files[0]);
      await uploadFile(formData);
      createFilesList();
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
        ${headings.map((row) => `<th scope="col">${row}</th>`).join("")}
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
  }

  // populating the available files in the list
  createFilesList();
});
