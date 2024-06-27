const form = document.getElementById("sendMessageFrom");
const ModalTrue = document.getElementById("TrueModal");
const FalseModal = document.getElementById("FalseModal");

// Send question Forma submit bo'lganda ishlaydigan funksiya
form.addEventListener("submit", async (e) => {
  try {
    const formData = {
      question_text: document.getElementById("question_text").value,
      event_id: document.getElementById("event_id").value,
      asked_by: document.getElementById("asked_by").value,
    };

    e.preventDefault();

    const response = await fetch("/event/question", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.log("Xato:" + error);
  }
});