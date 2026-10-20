// Google Apps Script web app: receives the experiment data and appends it to the bound Google Sheet.
// Setup: Extensions > Apps Script in a Google Sheet, paste this, then Deploy > Web app (Execute as: me, Access: anyone).
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var trials = ss.getSheetByName('trials') || ss.insertSheet('trials');
  if (trials.getLastRow() === 0) {
    trials.appendRow(['participant_id', 'date', 'trial_index', 'radius', 'pair', 'stim_path_left', 'stim_path_right', 'rating', 'rt_ms']);
  }
  var rows = d.data
    .filter(function (t) { return t.disp_type === 'likert_display'; })
    .map(function (t) {
      var r = JSON.parse(t.responses);
      return [d.participant_id, d.date, t.trial_index, t.radius, JSON.stringify(t.pair),
              t.stim_path_left, t.stim_path_right, r.thisPair, t.rt];
    });
  if (rows.length) {
    trials.getRange(trials.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  }

  // Full raw payload (demographics, browser info, interaction data) as a backup
  var raw = ss.getSheetByName('raw') || ss.insertSheet('raw');
  var json = JSON.stringify(d);
  var chunks = [d.participant_id, d.date];
  for (var i = 0; i < json.length; i += 40000) chunks.push(json.substr(i, 40000));
  raw.appendRow(chunks);

  return ContentService.createTextOutput('ok');
}
