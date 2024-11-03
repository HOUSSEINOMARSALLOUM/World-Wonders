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
      const col = document.createElement("div");
      col.classList.add("col-md-4");

      const card = document.createElement("div");
      card.classList.add("wonder-card", "card");

      card.innerHTML = `
              <img src="${wonder.image}" class="card-img-top" alt="${wonder.name}">
              <div class="card-body">
                  <h2 class="card-title">${wonder.name}</h2>
                  <button class="btn btn-warning" onclick="viewDetails('${wonder.id}')">View Details</button>
              </div>
          `;

      col.appendChild(card);
      wondersContainer.appendChild(col);

      // Populate the select dropdown for feedback
      const option = document.createElement("option");
      option.value = wonder.name;
      option.textContent = wonder.name;
      wonderSelect.appendChild(option);
    });
  } catch (error) {
    wondersContainer.innerHTML = `<p class="text-danger">Failed to load wonders. Please try again later.</p>`;
    console.error("Error fetching wonders:", error);
  }
});

function viewDetails(id) {
  window.location.href = `pages/wonder-details.html?id=${id}`;
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}
