const copyButton = document.getElementById("copy-button");
const websiteUrlInput = document.getElementById("website-url");

const defaultIcon = document.getElementById("default-icon");
const successIcon = document.getElementById("success-icon");
const defaultTooltipMessage = document.getElementById(
  "default-tooltip-message"
);
const successTooltipMessage = document.getElementById(
  "success-tooltip-message"
);

copyButton.addEventListener("click", () => {
  // Matnni clipboardga nusxalash
  navigator.clipboard
    .writeText(websiteUrlInput.value)
    .then(() => {
      showSuccess();

      // Bir necha soniyadan keyin default holatiga qaytarish
      setTimeout(() => {
        resetToDefault();
      }, 2000);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

const showSuccess = () => {
  defaultIcon.classList.add("hidden");
  successIcon.classList.remove("hidden");
  defaultTooltipMessage.classList.add("hidden");
  successTooltipMessage.classList.remove("hidden");
};

const resetToDefault = () => {
  defaultIcon.classList.remove("hidden");
  successIcon.classList.add("hidden");
  defaultTooltipMessage.classList.remove("hidden");
  successTooltipMessage.classList.add("hidden");
};
