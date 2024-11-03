document.addEventListener("DOMContentLoaded", async () => {
  const wondersContainer = document.getElementById("wonders-container");

  // Check if wondersContainer exists before modifying it
  if (!wondersContainer) {
    console.error(
      "Element with id 'wonders-container' not found in the document."
    );
    return;
  }

  try {
    const response = await axios.get(
      "https://www.world-wonders-api.org/v0/wonders"
    );
    const wonders = response.data;

    if (Array.isArray(wonders) && wonders.length > 0) {
      wonders.forEach((wonder) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm");

        // Check if the images array has at least one valid image
        const imageSrc =
          wonder.links.images && wonder.links.images.length > 0
            ? wonder.links.images[0]
            : "path/to/fallback.jpg";

        card.innerHTML = `
                  <img src="${imageSrc}" class="card-img-top" alt="${
          wonder.name
        }">
                  <div class="card-body">
                      <h2 class="card-title">${wonder.name}</h2>
                      <p class="card-text">${wonder.summary}</p>
                      <button class="btn btn-warning" onclick="viewDetails('${encodeURIComponent(
                        wonder.name
                      )}')">View Details</button>
                  </div>
              `;

        col.appendChild(card);
        wondersContainer.appendChild(col);
      });
    } else {
      wondersContainer.innerHTML =
        '<p class="text-warning">No wonders found.</p>';
    }
  } catch (error) {
    wondersContainer.innerHTML = `
          <div class="alert alert-danger" role="alert">
              Failed to load wonders. Please try again later.
          </div>`;
    console.error("Error fetching wonders:", error);
  }
});

// Function to handle navigation to the details page
function viewDetails(name) {
  window.location.href = `pages/wonder-details.html?name=${name}`;
}
