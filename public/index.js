const form = document.getElementById("sendMessageFrom");

// Forma submit bo'lganda ishlaydigan funksiya
form.addEventListener("submit", function (e) {
  const formData = {
    question_text: document.getElementById("question_text").value,
    event_id: document.getElementById("event_id").value,
  };

//   e.preventDefault();
  fetch("/event/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Serverdan kelgan javob:", data))
    .catch((error) => console.error("Xato yuz berdi:", error));
  console.log("bosildi");
});
