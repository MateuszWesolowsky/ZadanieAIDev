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
  const articleText = await readTextFile(file);
};

const readTextFile = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
