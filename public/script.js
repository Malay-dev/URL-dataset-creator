let intervalId = null;
window.addEventListener("load", async () => {
  const initial_urls = await fetch_urls("/url_data");
  renderData(initial_urls);
});

async function fetch_urls() {
  try {
    const response = await fetch(`/url_data`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching url_data:", error.message);
    return [];
  }
}
function startAutoRefresh() {
  intervalId = setInterval(async () => {
    const logsAfterDelay = await fetch_urls("/url_data");
    renderData(logsAfterDelay);
  }, 3000);
}
function stopAutoRefresh() {
  clearInterval(intervalId);
}
const toggleButtonAuto = document.getElementById("toggleFetchLogs");
toggleButtonAuto.addEventListener("click", () => {
  if (intervalId) {
    stopAutoRefresh();
    intervalId = null;
    toggleButtonAuto.textContent = "Start Auto-Refresh";
  } else {
    startAutoRefresh();
    toggleButtonAuto.textContent = "Stop Auto-Refresh";
  }
});
const refreshButton = document.getElementById("refreshLogs");
refreshButton.addEventListener("click", async () => {
  const refreshed_urls = await fetch_urls("/url_data");
  renderData(refreshed_urls);
});
// JavaScript code for handling form submission, fetching data, and pagination
const urlForm = document.getElementById("url-form");
const logDataElement = document.getElementById("logData");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageElement = document.getElementById("currentPage");
let mode = "single_filter";

urlForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(urlForm);
  const filteredData = await fetchFilteredData(formData);
  renderData(filteredData);
});


function renderData(data) {
  logDataElement.innerHTML = "";
  data.forEach((log) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${log.level}</td>
          <td>${log.message}</td>
          <td>${log.resourceId}</td>
          <td>${log.timestamp}</td>
          <td>${log.traceId}</td>
          <td>${log.spanId}</td>
          <td>${log.commit}</td>
          <td>${JSON.stringify(log.metadata)}</td>
          <!-- Render other fields -->
        `;
    logDataElement.appendChild(row);
  });
}

const toggleButton = document.getElementById("toggleFilterType");
const singleFilter = document.getElementById("singleFilter");
const multipleFilter = document.getElementById("multipleFilter");

toggleButton.addEventListener("click", () => {
  if (singleFilter.style.display === "none") {
    singleFilter.style.display = "block";
    multipleFilter.style.display = "none";
    mode = "single_filter";
  } else {
    singleFilter.style.display = "none";
    multipleFilter.style.display = "block";
    mode = "multiple_filter";
  }
});
