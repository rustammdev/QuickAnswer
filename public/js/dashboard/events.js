// Create event modal
const CreateEventButton = document.getElementById("CreateEventModal");
const sidebarEvent = document.getElementById(
  "CreateEventSidebarButton"
);
const cancelEvent = document.getElementById("closeEventModal");

sidebarEvent.addEventListener("click", () => {
  CreateEventButton.classList.remove("hidden");
  CreateEventButton.classList.add("flex");
});

cancelEvent.addEventListener("click", () => {
  CreateEventButton.classList.add("hidden");
  CreateEventButton.classList.remove("flex");
});

// // close modal without key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    CreateEventButton.classList.add("hidden");
    CreateEventButton.classList.remove("flex");
  }
});

const message_evetn = document.getElementById("ResponseMessageCreateEvent");

// Submit form
const EventForm = document.getElementById("eventForm");
const SubmitEvent = document.getElementById("submit_event");

EventForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const eventData = {
    event_name: document.querySelector("#title").value,
    event_desc: document.querySelector("#description").value,
    event_link: document.querySelector("#location").value,
    end_date: document.querySelector("#date").value,
  };

  try {
    loader.classList.remove("hidden");
    const response = await fetch("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    SubmitEvent.classList.add("cursor-not-allowed");
    SubmitEvent.setAttribute("disabled", "true");
    const responseData = await response.json();
    location.reload();
    loader.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
});
