# Scene wheel similarity judgment (pilot)

jsPsych experiment: participants rate the similarity (0-5) of pairs of scenes from a scene wheel.
Open `index.html` through a web server (GitHub Pages or `python -m http.server`).

## Stimuli
`stimuli/Wheel01/wheel01_rXX/NNNNNN.jpg`: 12 frames (0, 30, ... 330) per radius (`05`=0.5x, `10`=1x, `20`=2x),
sampled from the full 360-frame renders (kept locally in `stimuli/Wheel_DiningRoom/`, git-ignored).

## Data collection
1. Create a Google Sheet, then Extensions > Apps Script, and paste in `apps_script/Code.gs`.
2. Deploy > New deployment > Web app: Execute as *Me*, Who has access *Anyone*. Copy the `/exec` URL.
3. Paste it into `SAVE_URL` near the top of the script in `index.html`.

Data lands in the `trials` sheet (one row per rating) and the `raw` sheet (full payload).
If `SAVE_URL` is empty or the upload fails, a CSV is downloaded to the participant's computer instead.
