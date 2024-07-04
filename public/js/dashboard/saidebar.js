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
const RefleshQuestion = document.getElementById("refleshQuestion");

// question data fetch
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
    DefaultDataDashboard.classList.add("hidden");

    document.getElementById(
      "questionCount"
    ).textContent = `${resdata.length}`;

    const template = resdata
      .map(
        (item) => `
      <li class="content-item cursor-pointer text-gray-900 hover:text-white">
        <li>
          <div class="flex items-start gap-2.5 mb-2">
            <div class="flex flex-col w-full max-w-[380px] leading-1.5">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-md font-semibold">${
                  item.asked_by ? item.asked_by : "unknown"
                }</span>
              </div>
              <p class="text-md font-normal ">${
                item.question_text
              }</p>
            </div>
          </div>
        </li>
      </li>

    `
      )
      .join("");

    if (template.length) {
      document.getElementById("eventsListContainer").innerHTML =
        template;
    } else {
      document.getElementById("eventsListContainer").innerHTML = "";
      document
        .getElementById("pustoylist")
        .classList.remove("hidden");
    }

    loader.classList.add("hidden");
  } catch (error) {
    console.error("Fetch error:", error);
  }
});
