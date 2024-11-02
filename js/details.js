document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const detailsContainer = document.getElementById("wonder-details");

  if (!id) {
    detailsContainer.innerHTML = "<p>No wonder selected.</p>";
    return;
  }

  try {
    const response = await axios.get(
      `https://www.world-wonders-api.org/v0/wonders/${id}`
    );
    const wonder = response.data;

    document.getElementById("wonder-name").textContent = wonder.name;
    detailsContainer.innerHTML = `
            <img src="${wonder.image}" alt="${wonder.name}">
            <p><strong>Location:</strong> ${wonder.location}</p>
            <p>${wonder.description}</p>
        `;
  } catch (error) {
    detailsContainer.innerHTML =
      "<p>Failed to load wonder details. Please try again later.</p>";
    console.error("Error fetching wonder details:", error);
  }
});
