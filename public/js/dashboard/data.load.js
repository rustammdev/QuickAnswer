const eventList = document.getElementById("events-list");

// dashboard main content
const EventNameDashboard = document.querySelector(
  "#EventNameDashboard"
);
const EventDescDashboard = document.querySelector(
  "#EventDescDashboard"
);
const DefaultDataDashboard = document.querySelector(
  "#DefaultDataDashboard"
);

eventList.addEventListener("click", async (event) => {
  const listItem = event.target.closest(".content-item");
  const contentId = listItem.getAttribute("data-content-id");
  try {
    console.log(`/dashboard/${contentId}`);
    const res = await fetch(`/dashboard/${contentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // event id
    const resdata = await res.json();

    DefaultDataDashboard.classList.add(`hidden`);
    EventNameDashboard.textContent = `${resdata.event_name}`;
    EventDescDashboard.textContent = `${resdata.event_desc}`;
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
