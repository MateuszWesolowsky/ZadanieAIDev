const fileInput = document.querySelector(".fileInput");
const sendButton = document.querySelector(".sendBtn");

const apiKey = "YOUR API KEY";

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(file);
});
