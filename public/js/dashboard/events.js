// Create event modal
const CreateEventBtn = document.getElementById("CreateEvent");
const CreateEventModal = document.getElementById("CreateEventModal");
const closeEventModal = document.querySelector("#closeEventModal");
const EventForm = document.querySelector("#eventForm");
const ResponseMessageCreateEvent = document.querySelector(
  "#ResponseMessageCreateEvent"
);

CreateEventBtn.addEventListener("click", () => {
  //   location.reload();
  sidebar.classList.add("-translate-x-full");
  CreateEventModal.classList.remove("hidden");
  CreateEventModal.classList.add("flex");

  CreateEventModal.querySelector("div").classList.add(
    "translate-y-0",
    "opacity-100"
  );
});

closeEventModal.addEventListener("click", (e) => {
  // reset form
  location.reload();
  EventForm.reset();
  closeModal();
});

CreateEventModal.addEventListener("click", (e) => {
  if (e.target === CreateEventModal) {
    location.reload();
    closeModal();
  }
});

// close modal without key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// close modal
function closeModal() {
  CreateEventModal.querySelector("div").classList.remove(
    "translate-y-0",
    "opacity-100"
  );
  CreateEventModal.querySelector("div").classList.add(
    "translate-y-4",
    "opacity-0"
  );
  CreateEventModal.classList.remove("flex");
  CreateEventModal.classList.add("hidden");
  ResponseMessageCreateEvent.textContent = "";
  location.reload();
}

// Submit form
EventForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const eventData = {
    event_name: document.querySelector("#title").value,
    event_desc: document.querySelector("#description").value,
    event_link: document.querySelector("#location").value,
    end_date: document.querySelector("#date").value,
  };

  try {
    console.log("Data sended");
    const response = await fetch("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Data recived");
    const responseData = await response.json();
    ResponseMessageCreateEvent.textContent = "Event created.";
    console.log(responseData);
  } catch (error) {
    console.log("Xato:" + error);
  }
});
