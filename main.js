const fileInput = document.querySelector(".fileInput");
const sendButton = document.querySelector(".sendBtn");

const apiKey = "YOUR API KEY";

let selectedFile = null;

fileInput.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});

sendButton.addEventListener("click", () => {
  if (selectedFile) {
    processFile(selectedFile);
  }
});

const processFile = async (file) => {
  console.log("test");
};
