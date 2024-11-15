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
  try {
    const articleText = await readTextFile(file);
    const htmlContent = await generateHtmlContent(articleText);
    saveToFile(htmlContent);
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
};

const readTextFile = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const generateHtmlContent = async (articleText) => {
  const prompt = `
          Przetwórz poniższy tekst artykułu na HTML, używając odpowiednich tagów struktury. 
          Dodaj tagi <img src="image_placeholder.jpg" alt="..." /> tam, gdzie obrazki byłyby pomocne, 
          z dokładnymi opisami w alt, oraz podpisy pod obrazkami. 
          Pomiń CSS i JavaScript. Zwrócony kod powinien zawierać wyłącznie zawartość do
          wstawienia pomiędzy tagami <body> i </body>. Nie dołączaj znaczników <html>,
          <head> ani <body>.`;

  sendButton.classList.add("loading");
  sendButton.setAttribute("disabled", "true");
  sendButton.textContent = "Pobieranie pliku..";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Jesteś pomocnym asystentem konwertującym tekst na HTML.",
          },
          { role: "user", content: `${prompt}\n\n${articleText}` },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (response.status === 200) {
      sendButton.classList.remove("loading");
      sendButton.setAttribute("disabled", "false");
      sendButton.textContent = "Wyślij do OpenAI";

      const data = await response.json();
      return data.choices[0].message.content;
    } else {
      throw new Error("Błąd w odpowiedzi z API");
    }
  } catch (error) {
    console.error(error);
    sendButton.classList.remove("loading");
    sendButton.setAttribute("disabled", "false");
    sendButton.textContent = "Wyślij do OpenAI";
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

const saveToFile = (content, filename = "artykul.html") => {
  const blob = new Blob([content], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
