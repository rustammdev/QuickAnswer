// modal alert
const modalDelete = document.getElementById("modalDelete");
const confirtDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const closeButton = document.getElementById("closeButton");

// delete button
deleteEvent.addEventListener("click", async (event) => {
  modalDelete.classList.remove("hidden");
});

// cancel
closeButton.addEventListener("click", () => {
  modalDelete.classList.add("hidden");
});

// cancel
cancelDelete.addEventListener("click", () => {
  modalDelete.classList.add("hidden");
});


// confirm delete
confirtDelete.addEventListener("click", async () => {
  const deleteEvent = document.getElementById("deleteEvent");
  const delId = deleteEvent.getAttribute("data-content");
  try {
    loader.classList.remove("hidden");
    const res = await fetch("/event/delete", {
      method: "DELETE",
      body: JSON.stringify({ id: `${delId}` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    loader.classList.add("hidden");
    location.reload();
  } catch (error) {
    console.log(error);
  }
  modalDelete.classList.add("hidden");
});

