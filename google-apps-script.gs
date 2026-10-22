// Paste this into Extensions → Apps Script on your waitlist Google Sheet,
// then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
// Copy the web app URL into WAITLIST_ENDPOINT in script.js.

const SHEET_NAME = "Waitlist";
const SEND_CONFIRMATION = true;

function doPost(e) {
  const params = (e && e.parameter) || {};
  if (params._gotcha) return json({ ok: true }); // bot

  const email = String(params.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const last = sheet.getLastRow();
    const existing = last > 1 ? sheet.getRange(2, 1, last - 1, 1).getValues().flat() : [];
    if (existing.includes(email)) return json({ ok: true, duplicate: true });
    sheet.appendRow([email, new Date()]);
  } finally {
    lock.releaseLock();
  }

  if (SEND_CONFIRMATION) {
    try {
      MailApp.sendEmail({
        to: email,
        subject: "You're on the Mouthfuls waitlist",
        body:
          "Thanks for signing up! You're on the list, and we'll email you as soon as Mouthfuls is ready.\n\n— The Mouthfuls team",
      });
    } catch (err) {
      // Don't fail the signup if the daily email quota is hit.
      console.error(err);
    }
  }

  return json({ ok: true });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Email", "Signed up at"]);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
