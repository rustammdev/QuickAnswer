// User registeretion
const RegisterForm = document.querySelector("#register_form");
const LoaderRegister = document.querySelector("#loader");
const ResponseMessageRegister = document.querySelector(
  "#ResponseMessageRegister"
);

RegisterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  ResponseMessageRegister.textContent = ``;
  LoaderRegister.classList.remove("hidden");

  // Body data
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

    // Snipped
    const data = await response.json();
    if (response.ok) {
      ResponseMessageRegister.textContent = `${data.message}`;
      LoaderRegister.classList.add("hidden");

      setTimeout(() => {
        window.location.href = data.redirectTo;
      }, 1000);
    } else {
      LoaderRegister.classList.add("hidden");
      ResponseMessageRegister.textContent = `${data.message}`;
    }
  } catch (error) {
    console.log("Xato:" + error);
  }
});
