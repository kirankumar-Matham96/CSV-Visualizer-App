// API related functionality
const baseUrl = "http://localhost:3000";

const getFiles = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/csv`);
    const readable = await response.json();
    // console.log({ readable });
    return readable.files;
  } catch (error) {
    console.log(error);
  }
};

// DOM related functionality
document.addEventListener("DOMContentLoaded", async () => {
  const files = await getFiles();
  console.log({ files });
  // const files = [
  //   { name: "file 1", id: "1" },
  //   { name: "file 2", id: "2" },
  //   { name: "file 3", id: "3" },
  //   { name: "file 4", id: "4" },
  //   { name: "file 5", id: "5" },
  // ];

  const fileUploadFormEl = document.querySelector(".file-upload-form");
  const fileInputEl = document.querySelector("#file-input");
  const fileListEl = document.querySelector(".files-list-container");
  const tableEl = document.querySelector(".file-data-table-container");
  console.log(fileInputEl);

  fileUploadFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target["file-input"].value);
    console.log(event.target["file-input"].files[0]);
  });

  function createFilesList() {
    try {
      fileListEl.innerHTML = "";
      files.map((file) => {
        console.log({ file });
        console.log("id: ", file._id);
        console.log("name: ", file.fileName);
        const fileBtn = document.createElement("button");
        fileBtn.classList.add("btn", "btn-outline-info");
        fileBtn.setAttribute("id", file._id);
        fileBtn.textContent = file.fileName;
        fileListEl.appendChild(fileBtn);
      });
    } catch (error) {
      console.log(error);
    }
  }

  createFilesList();

  // function createFileDisplayContent() {
  //   tableEl.innerHTML = "";
  // }
});
