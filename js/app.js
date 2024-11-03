document.addEventListener("DOMContentLoaded", async () => {
  const wondersContainer = document.getElementById("wonders-container");
  const wonderSelect = document.getElementById("wonder");

  try {
    const response = await axios.get(
      "https://www.world-wonders-api.org/v0/wonders"
    );
    const wonders = response.data;

    // Populate wonders on the main page
    wonders.forEach((wonder) => {
      const card = document.createElement("article");
      card.classList.add("wonder-card");

      card.innerHTML = `
              <img src="${wonder.image}" alt="${wonder.name}">
              <h2>${wonder.name}</h2>
              <button onclick="viewDetails('${wonder.id}')">View Details</button>
          `;

      wondersContainer.appendChild(card);

      // Populate the select dropdown
      const option = document.createElement("option");
      option.value = wonder.name;
      option.textContent = wonder.name;
      wonderSelect.appendChild(option);
    });
  } catch (error) {
    wondersContainer.innerHTML = `<p>Failed to load wonders. Please try again later.</p>`;
    console.error("Error fetching wonders:", error);
  }
});

function viewDetails(id) {
  window.location.href = `pages/wonder-details.html?id=${id}`;
}
