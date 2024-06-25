const form = document.getElementById("sendMessageFrom");
const ModalTrue = document.getElementById("TrueModal");
const FalseModal = document.getElementById("FalseModal");

// Forma submit bo'lganda ishlaydigan funksiya
form.addEventListener("submit", async (e) => {
  try {
    const formData = {
      question_text: document.getElementById("question_text").value,
      event_id: document.getElementById("event_id").value,
      asked_by: document.getElementById("asked_by").value,
    };

    // e.preventDefault();

    const response = await fetch("/event/question", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Xato:" + error);
  }
});

// User registeretion
const RegisterForm = document.querySelector("#register_form");

RegisterForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const formData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    // console.log(formData);

    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('Data recived');
  } catch (error) {
    console.log("Xato:" + error);
  }
  console.log();
});
