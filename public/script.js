let intervalId = null;
let mode = "normal";

window.addEventListener("load", async () => {
  const initial_urls = await fetch_urls();
  console.log(initial_urls);
  renderData(initial_urls);
});

async function fetch_urls() {
  try {
    const response = await fetch(`/browse/url_data`);
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
const toggle_auto_refresh = document.getElementById("toggle-auto-refresh");
toggle_auto_refresh.addEventListener("click", () => {
  if (intervalId) {
    stopAutoRefresh();
    intervalId = null;
    toggle_auto_refresh.textContent = "Start Auto-Refresh";
  } else {
    startAutoRefresh();
    toggle_auto_refresh.textContent = "Stop Auto-Refresh";
  }
});

const refresh_button = document.getElementById("refresh");
refresh_button.addEventListener("click", async () => {
  const refreshed_urls = await fetch_urls("/url_data");
  renderData(refreshed_urls);
});
// JavaScript code for handling form submission, fetching data, and pagination
const url_data_element = document.getElementById("url-data");
const urlForm = document.getElementById("url-form");
const result_val = document.getElementById("result-val");

urlForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  result_val.innerHTML = "";
  if (mode === "normal") {
    const formData = new FormData(urlForm);
    console.log(Object.fromEntries(formData));
    const body = Object.fromEntries(formData);
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`/browse`, options);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);
    result_val.innerHTML = JSON.stringify(data);
  } else {
    const formData = new FormData();
    const fileInput = document.getElementById("file");
    formData.append("file", fileInput.files[0]);
    console.log(formData.get("file"));
    options = {
      method: "POST",
      body: formData.get("file"),
    };
    const response = await fetch(`/file/`, options);
    const data = await response.json();
    console.log(data);
    result_val.innerHTML = JSON.stringify(data);
  }
});

function renderData(data) {
  url_data_element.innerHTML = "";
  data.forEach((url_data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${url_data.url.protocol}</td>
          <td>${url_data.url.domain_name}</td>
          <td>${url_data.url.paths}</td>
          <td>${JSON.stringify(url_data.url.parameters)}</td>
          <td>${url_data.url.fragments}</td>
          <td>${JSON.stringify(url_data.metadata.top_country_shares)}</td>
          <td>${url_data.metadata.location}</td>
          <td>${url_data.metadata.global_index}</td>
          <td>${url_data.metadata.local_index}</td>
          <td>${JSON.stringify(url_data.metadata.category_rank)}</td>
          <td>${url_data.metadata.category}</td>
          <td>${JSON.stringify(url_data.metadata.traffic_sources)}</td>
          <td>${JSON.stringify(url_data.metadata.engagements)}</td>
          <td>${JSON.stringify(url_data.metadata.estimated_monthly_visits)}</td>
          <!-- Render other fields -->
        `;
    url_data_element.appendChild(row);
  });
}
const toggleButton = document.getElementById("use-browser-history");
const normalForm = document.getElementById("normal-form");
const uploadFileForm = document.getElementById("upload-file-form");

toggleButton.addEventListener("click", () => {
  if (normalForm.style.display === "none") {
    normalForm.style.display = "block";
    uploadFileForm.style.display = "none";
    toggleButton.textContent = "Use Browser History";
    mode = "normal";
  } else {
    normalForm.style.display = "none";
    uploadFileForm.style.display = "block";
    toggleButton.textContent = "Use Normal Form";
    mode = "file-upload-mode";
  }
});
