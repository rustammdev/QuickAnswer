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
  LoginForm.reset();
  ResponseMessageLogin.textContent = ``;
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
const LoaderLogin = document.querySelector("#LoaderLogin");
const ResponseMessageLogin = document.querySelector(
  "#ResponseMessageLogin"
);

LoginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  ResponseMessageLogin.textContent = ``;
  LoaderLogin.classList.remove("hidden");

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

    const data = await response.json();
    if (response.ok) {
      // Muvaffaqiyatli login bo'lsa, dashboardga yo'naltirish
      window.location.href = data.redirectTo;
      closeModal();
      LoaderLogin.classList.add("hidden");
    } else {
      // Login xato bo'lsa, xato xabarini ko'rsatish
      LoaderLogin.classList.add("hidden");
      ResponseMessageLogin.textContent = `${data.message}`;
    }
  } catch (error) {
    console.log("Xato: " + error);
  }
});
