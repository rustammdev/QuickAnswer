const clipboar = document.getElementById("clipboar");

clipboar.addEventListener("click", (e) => {
  const data = e.target.innerText;

  navigator.clipboard.writeText(data);

  clipboar.textContent = "Copied!";
  setTimeout(() => {
    clipboar.textContent = data;
  }, 1500);
});
