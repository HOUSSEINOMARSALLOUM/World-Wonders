document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const detailsContainer = document.getElementById("wonder-details");
  const wonderNameElement = document.getElementById("wonder-name");

  // Ensure the elements are present in the document
  if (!detailsContainer || !wonderNameElement) {
    console.error("Required elements not found in the document.");
    return;
  }

  if (!name) {
    detailsContainer.innerHTML = `
          <div class="alert alert-warning" role="alert">
              No wonder selected. Please return to the main page and select a wonder.
          </div>`;
    return;
  }

  try {
    const response = await axios.get(
      "https://www.world-wonders-api.org/v0/wonders"
    );
    const wonders = response.data;

    // Find the wonder based on the name from the query string
    const wonder = wonders.find((w) => w.name === decodeURIComponent(name));

    if (wonder) {
      wonderNameElement.textContent = wonder.name;
      detailsContainer.innerHTML = `
              <div class="card mb-4 shadow-sm">
                  ${
                    wonder.links.images && wonder.links.images.length > 0
                      ? `
                  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                      <div class="carousel-inner">
                          ${wonder.links.images
                            .map(
                              (image, index) => `
                              <div class="carousel-item ${
                                index === 0 ? "active" : ""
                              }">
                                  <img src="${image}" class="d-block w-100" alt="${
                                wonder.name
                              } image ${index + 1}">
                              </div>
                          `
                            )
                            .join("")}
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                      </button>
                  </div>
                  `
                      : '<p class="text-warning">No images available for this wonder.</p>'
                  }
                  <div class="card-body">
                      <h2 class="card-title">${wonder.name}</h2>
                      <p class="card-text"><strong>Location:</strong> ${
                        wonder.location
                      }</p>
                      <p class="card-text">${wonder.summary}</p>
                      <div class="mt-3">
                          <a href="${
                            wonder.links.wiki
                          }" class="btn btn-primary" target="_blank">Read on Wikipedia</a>
                          <a href="${
                            wonder.links.google_maps
                          }" class="btn btn-secondary" target="_blank">View on Google Maps</a>
                      </div>
                  </div>
              </div>`;
    } else {
      detailsContainer.innerHTML = `
              <div class="alert alert-warning" role="alert">
                  Wonder data not found. Please check your selection and try again.
              </div>`;
    }
  } catch (error) {
    detailsContainer.innerHTML = `
          <div class="alert alert-danger" role="alert">
              Failed to load wonder details. Please try again later.
          </div>`;
    console.error("Error fetching wonder details:", error);
  }
});
