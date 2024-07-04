const modal = document.getElementById("SendQuestionModal");
const form = document.getElementById("SendQuestionForm");
const SendQuestionSidebar = document.getElementById(
  "SendQuestionsButton"
);
const closebtn = document.getElementById("close_send_question");

SendQuestionSidebar.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closebtn.addEventListener("click", () => {
  message_question.classList.add("hidden");
  form.reset();
  modal.classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    message_question.classList.add("hidden");
    modal.classList.add("hidden");
    form.reset();
  }
});

const message_question = document.getElementById(
  "ResMessageSendQuestion"
);

// Send question Forma submit bo'lganda ishlaydigan funksiya
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    loader.classList.remove("hidden");
    const formData = {
      question_text: document.getElementById("questiond_text").value,
      event_id: document.getElementById("event_id").value,
      asked_by: document.getElementById("acked_by").value,
    };

    const response = await fetch("/sendquestion", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

    message_question.classList.remove("hidden");
    message_question.textContent = `${res.message}`;

    form.reset();
    setTimeout(() => {
      message_question.classList.add("hidden");
    }, 2500);
    loader.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
});
