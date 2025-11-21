
const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";


const samplePatients = [
  {
    id: "sample-1",
    name: "Jessica Taylor",
    age: 34,
    gender: "Female",
    avatar: "", // optional
    notes: "No known allergies.",
    vitals: [
      { year: 2020, systolic: 118, diastolic: 76 },
      { year: 2021, systolic: 120, diastolic: 78 },
      { year: 2022, systolic: 125, diastolic: 80 },
      { year: 2023, systolic: 128, diastolic: 84 },
      { year: 2024, systolic: 130, diastolic: 85 }
    ]
  }
];

// helper
function q(id){ return document.getElementById(id); }

// Fetch wrapper: robust for arrays or single-object responses
async function fetchPatients() {
  if (!API_URL || API_URL.startsWith("REPLACE_WITH")) {
    console.warn("API_URL not set or left as placeholder. Using sample data.");
    return samplePatients;
  }

  try {
    const resp = await fetch(API_URL, { method:"GET",
        header:{
            "Authorization": "Basic y29hbG10aW9uOnNraWxscy10ZXNO"
        },
        cache: "no-store"
     });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    // data could be:
    // - array of patients
    // - object { patients: [...] }
    // - single patient object

    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.patients)) return data.patients;
    // if response is single patient object, wrap into array
    if (data && data.name) return [data];

    // unknown shape fallback
    console.warn("Unknown response shape from API, using sample data.");
    return samplePatients;
  } catch (err) {
    console.warn("Fetch failed (CORS/network). Using sample data. Error:", err.message);
    return samplePatients;
  }
}

// Find Jessica Taylor robustly
function findJessica(patients) {
  if (!Array.isArray(patients)) return null;
  return patients.find(p => {
    if (!p || !p.name) return false;
    return p.name.toLowerCase().trim() === "jessica taylor";
  }) || null;
}

function populatePatient(patient) {
  if (!patient) {
    q("patient-name").textContent = "Jessica Taylor — Not found";
    q("patient-age-gender").textContent = "";
    q("patient-other").textContent = "";
    drawBPChart([]); // blank chart
    return;
  }

  q("patient-name").textContent = patient.name || "Jessica Taylor";
  q("patient-age-gender").textContent = `${patient.age || ""} • ${patient.gender || ""}`;
  q("patient-other").textContent = patient.notes || "";

  const avatar = patient.avatar || "https://via.placeholder.com/84?text=JT";
  q("avatar").src = avatar;

  const vitals = normalizeVitals(patient.vitals || patient.bp || []);
  populateVitalsList(vitals);
  drawBPChart(vitals);
}

// Normalize common variations of vitals array
function normalizeVitals(arr) {
  if (!Array.isArray(arr)) return [];
  // try to produce objects { year, systolic, diastolic }
  return arr.map(item => {
    // If item is like {year:..., systolic:..., diastolic:...} -> keep
    if (item && typeof item.year !== "undefined" && typeof item.systolic !== "undefined") {
      return item;
    }
    // If item might be {date: "...", systolic: 120, diastolic: 80}
    if (item && item.date && typeof item.systolic !== "undefined") {
      const year = (new Date(item.date)).getFullYear() || item.year || "";
      return { year, systolic: item.systolic, diastolic: item.diastolic || null };
    }
    // If item pixel / other shape, return empty
    return null;
  }).filter(Boolean);
}

function populateVitalsList(vitals) {
  const ul = q("vitals-list");
  ul.innerHTML = "";
  if (!vitals.length) {
    const li = document.createElement("li");
    li.textContent = "No vitals available.";
    ul.appendChild(li);
    return;
  }
  // show newest first
  const sorted = vitals.slice().sort((a,b) => (b.year||0) - (a.year||0));
  sorted.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.year} — Systolic: ${v.systolic} / Diastolic: ${v.diastolic ?? "—"}`;
    ul.appendChild(li);
  });
}

/* Chart.js part */
let bpChart = null;
function drawBPChart(vitals) {
  const ctx = q("bpChart").getContext("2d");
  const sorted = (vitals || []).slice().sort((a,b) => (a.year||0) - (b.year||0));
  const labels = sorted.map(v => String(v.year || ""));
  const systolic = sorted.map(v => v.systolic || null);
  const diastolic = sorted.map(v => v.diastolic || null);

  if (bpChart) bpChart.destroy();
  bpChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolic,
          borderWidth: 2,
          tension: 0.2,
          spanGaps: true
        },
        {
          label: 'Diastolic',
          data: diastolic,
          borderWidth: 2,
          tension: 0.2,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: false } }
    }
  });
}

// Main
(async function main() {
  const patients = await fetchPatients();
  const jessica = findJessica(patients);
  // If not found, try to search for "jessica" partial match
  if (!jessica) {
    const partial = patients.find(p => p.name && p.name.toLowerCase().includes("jessica"));
    if (partial) {
      console.warn("Exact 'Jessica Taylor' not found; using partial match:", partial.name);
      populatePatient(partial);
      return;
    }
  }

  populatePatient(jessica || null);
})();