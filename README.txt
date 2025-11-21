Patient Dashboard — Submission README

What this is:
- Single-page site (index.html + style.css + script.js).
- Uses Chart.js to render blood-pressure chart.
- Fetches patient data from a GET endpoint (must replace API_URL in script.js).
used content form this links# Patient Dashboard — Jessica Taylor

Simple static dashboard that loads patient data (tries API, falls back to sample) and displays a patient card, a blood-pressure chart (Chart.js) and a recent vitals list.

## Files
- index.html — main page
- style.css — page styles (responsive, sidebar, cards)
- script.js — data fetch, parse, UI binding and Chart.js setup
- README.md — this file

## Quick start (Windows)
1. Edit the GET endpoint in `script.js`:
   - Open `script.js` and set `const API_URL = "https://your.getpostman.endpoint/here";`
   - If left blank or unreachable, the bundled sample patient (Jessica Taylor) is used.

2. Serve the folder (recommended to avoid CORS issues):
   - Using Python (from project folder):
     - `python -m http.server 8000`
     - Open http://localhost:8000
   - Or use VS Code Live Server extension and open `index.html`.

3. Open `index.html` in a browser (or via the server URL).

## Configure API
- The app expects a GET that returns either:
  - An array of patient objects, or
  - `{ patients: [...] }`, or
  - A single patient object.
- The code looks for a patient named `Jessica Taylor` (case-insensitive). If not found it attempts a partial match on "jessica".
- Sample patient is included to guarantee the UI shows expected data for the test.

## Notes & troubleshooting
- Chart.js is included via CDN in `index.html`. No install required.
- Avatar: if a patient object has `avatar` it will be used; otherwise a placeholder is shown. Broken image URLs fallback to the placeholder.
- CORS / network failures: the script falls back to local sample data and logs a warning in the console.
- To debug, open DevTools Console: errors and network requests are logged.
- If the chart appears blank, verify `patient.vitals` exists and contains objects like `{ year, systolic, diastolic }`.

## Tips
- To change which patient is shown, modify `findJessica()` in `script.js` or update the sample data.
- Use the browser console to inspect the fetched response shape and adapt `normalizeVitals()` if your API uses different field names.

```// filepath: c:\Users\mekap\OneDrive\Desktop\assignment\README.md
# Patient Dashboard — Jessica Taylor

Simple static dashboard that loads patient data (tries API, falls back to sample) and displays a patient card, a blood-pressure chart (Chart.js) and a recent vitals list.

## Files
- index.html — main page
- style.css — page styles (responsive, sidebar, cards)
- script.js — data fetch, parse, UI binding and Chart.js setup
- README.md — this file

## Quick start (Windows)
1. Edit the GET endpoint in `script.js`:
   - Open `script.js` and set `const API_URL = "https://your.getpostman.endpoint/here";`
   - If left blank or unreachable, the bundled sample patient (Jessica Taylor) is used.

2. Serve the folder (recommended to avoid CORS issues):
   - Using Python (from project folder):
     - `python -m http.server 8000`
     - Open http://localhost:8000
   - Or use VS Code Live Server extension and open `index.html`.

3. Open `index.html` in a browser (or via the server URL).

## Configure API
- The app expects a GET that returns either:
  - An array of patient objects, or
  - `{ patients: [...] }`, or
  - A single patient object.
- The code looks for a patient named `Jessica Taylor` (case-insensitive). If not found it attempts a partial match on "jessica".
- Sample patient is included to guarantee the UI shows expected data for the test.

## Notes & troubleshooting
- Chart.js is included via CDN in `index.html`. No install required.
- Avatar: if a patient object has `avatar` it will be used; otherwise a placeholder is shown. Broken image URLs fallback to the placeholder.
- CORS / network failures: the script falls back to local sample data and logs a warning in the console.
- To debug, open DevTools Console: errors and network requests are logged.
- If the chart appears blank, verify `patient.vitals` exists and contains objects like `{ year, systolic, diastolic }`.

## Tips
- To change which patient is shown, modify `findJessica()` in `script.js` or update the sample data.
- Use the browser console to inspect the fetched response shape and adapt `normalizeVitals()` if your API uses different field names.


The URL to the Adobe XD template can be found here - https://xd.adobe.com/view/121254c9-532f-4772-a1ba-dfe529a96b39-4741/

Using the Coalition Technologies Patient Data API, you are to make a GET request to fetch the information that will be used to populate the UI to be created. The API documentation can be found here -https://documenter.getpostman.com/view/11861104/2sA35G42ve

In the Adobe XD template, there is a graph showing the blood pressure of the patients each year. We recommend using https://www.chartjs.org/.