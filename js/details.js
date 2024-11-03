document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const detailsContainer = document.getElementById("wonder-details");

  if (!id) {
    detailsContainer.innerHTML = `
      <div class="alert alert-warning" role="alert">
        No wonder selected. Please return to the main page and select a wonder.
      </div>`;
    return;
  }

  try {
    const response = await axios.get(
      `https://www.world-wonders-api.org/v0/wonders/${id}`
    );
    const wonder = response.data;

    document.getElementById("wonder-name").textContent = wonder.name;
    detailsContainer.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img src="${wonder.image}" class="card-img-top" alt="${wonder.name}">
        <div class="card-body">
          <h2 class="card-title">${wonder.name}</h2>
          <p class="card-text"><strong>Location:</strong> ${wonder.location}</p>
          <p class="card-text">${wonder.description}</p>
        </div>
      </div>`;
  } catch (error) {
    detailsContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Failed to load wonder details. Please try again later.
      </div>`;
    console.error("Error fetching wonder details:", error);
  }
});
