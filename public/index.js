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

// User registeretion
const RegisterForm = document.querySelector("#register_form");

RegisterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  try {
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data recived");
  } catch (error) {
    console.log("Xato:" + error);
  }
});

// Login modal
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");

loginBtn.addEventListener("click", () => {
  loginModal.classList.remove("hidden");
  loginModal.classList.add("flex");
  // setTimeout(() => {
  // }, 20);
  loginModal
    .querySelector("div")
    .classList.add("translate-y-0", "opacity-100");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  loginModal
    .querySelector("div")
    .classList.remove("translate-y-0", "opacity-100");
  loginModal
    .querySelector("div")
    .classList.add("translate-y-4", "opacity-0");
  loginModal.classList.remove("flex");
  loginModal.classList.add("hidden");
}

// login user
const LoginForm = document.querySelector("#LoginForm");
const LoginEmail = document.querySelector("#LoginEmail");
const LoginPassword = document.querySelector("#LoginPassword");

LoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    email: LoginEmail.value,
    password: LoginPassword.value,
  };

  try {
    console.log("Data sended");
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data recived");
    const data = await response.json();
    if (response.ok) {
      // Muvaffaqiyatli login bo'lsa, dashboardga yo'naltirish
      closeModal();
      window.location.href = data.redirectTo;
    } else {
      // Login xato bo'lsa, xato xabarini ko'rsatish
      console.error("Login xato: " + data.message);
    }
  } catch (error) {
    console.log("Xato: " + error);
  }
});
