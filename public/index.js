document.addEventListener("DOMContentLoaded", () => {
  const files = [
    { name: "file 1", id: "1" },
    { name: "file 2", id: "2" },
    { name: "file 3", id: "3" },
    { name: "file 4", id: "4" },
    { name: "file 5", id: "5" },
  ];

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
    fileListEl.innerHTML = "";
    files.map((file) => {
      const fileBtn = document.createElement("button");
      fileBtn.classList.add("btn", "btn-outline-info");
      fileBtn.setAttribute("id", file.id);
      fileBtn.textContent = file.name;
      fileListEl.appendChild(fileBtn);
    });
  }

  createFilesList();

  function createFileDisplayContent() {
    tableEl.innerHTML = "";
  }
});
