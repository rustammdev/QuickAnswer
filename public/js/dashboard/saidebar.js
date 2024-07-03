const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
openSidebar.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
});
closeSidebar.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
});

// loader
const loader = document.querySelector("#loader");

// data load
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
const EventQuestions = document.querySelector("#EventQuestions");

eventList.addEventListener("click", async (event) => {
  const listItem = event.target.closest(".content-item");
  const contentId = listItem.getAttribute("data-content-id");
  sidebar.classList.add("-translate-x-full");
  try {
    loader.classList.remove("hidden");
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
    console.log(resdata);
    // DefaultDataDashboard.classList.add(`hidden`);

    // // event questions hidden
    // EventQuestions.classList.remove("hidden");

    // EventNameDashboard.textContent = `${resdata.event_name}`;
    // EventDescDashboard.textContent = `${resdata.event_desc}`;
    loader.classList.add("hidden");
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
