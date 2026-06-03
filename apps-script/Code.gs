/**
 * Vegety — Menu Webhook (Google Apps Script Web App)
 * ---------------------------------------------------
 * Serves the "Menu" sheet as JSON, secured by a shared secret.
 *
 * SECURITY MODEL
 *  - The secret lives in Script Properties (WEBHOOK_KEY), never in this file
 *    and never in the repo. Run setupKey() once to generate + store it.
 *  - Every request must present the key. We compare it in CONSTANT TIME to
 *    avoid timing side-channels.
 *  - Apps Script web apps cannot read custom request headers, so the key is
 *    sent in the POST JSON body (preferred) — it is NOT placed in the URL,
 *    so it never lands in server/proxy access logs.
 *  - The caller (your Next.js server) holds the key in a server-only env var,
 *    so the secret is never shipped to the browser.
 *  - Transport is always HTTPS (enforced by Apps Script).
 *
 * DEPLOY
 *  1. Open the Google Sheet → Extensions → Apps Script. Paste this file.
 *  2. Run setupKey() once. Authorise. Copy the logged key.
 *  3. Deploy → New deployment → type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone   (access is gated by the key, not Google auth)
 *  4. Copy the /exec Web App URL.
 *  5. Put the URL + key into your Next.js .env.local:
 *       MENU_WEBHOOK_URL=...   MENU_WEBHOOK_KEY=...
 *
 * ROTATE THE KEY: re-run setupKey() (or edit the WEBHOOK_KEY property), then
 * update MENU_WEBHOOK_KEY in your env and redeploy the site.
 */

var SHEET_NAME = "Menu";
var CACHE_TTL_SECONDS = 30; // short cache → fewer sheet reads, lower quota use

function doGet(e) {
  return handle_(e);
}

function doPost(e) {
  return handle_(e);
}

function handle_(e) {
  try {
    if (!checkAuth_(e)) {
      return json_({ ok: false, error: "unauthorized" });
    }
    return json_({ ok: true, items: readMenu_() });
  } catch (err) {
    // Never leak internals to the caller.
    return json_({ ok: false, error: "server_error" });
  }
}

/** Returns true only if a valid key was supplied. */
function checkAuth_(e) {
  var expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_KEY");
  if (!expected) return false; // refuse if not configured
  var provided = extractKey_(e);
  if (!provided) return false;
  return constantTimeEquals_(provided, expected);
}

/** Read the key from the POST body { "key": "..." }, else from ?key= (fallback). */
function extractKey_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      var body = JSON.parse(e.postData.contents);
      if (body && body.key) return String(body.key);
    } catch (ignore) {}
  }
  if (e && e.parameter && e.parameter.key) return String(e.parameter.key);
  return "";
}

/** Constant-time comparison to mitigate timing attacks. */
function constantTimeEquals_(a, b) {
  var ba = Utilities.newBlob(a).getBytes();
  var bb = Utilities.newBlob(b).getBytes();
  var diff = ba.length ^ bb.length;
  var n = Math.max(ba.length, bb.length);
  for (var i = 0; i < n; i++) {
    var x = i < ba.length ? ba[i] : 0;
    var y = i < bb.length ? bb[i] : 0;
    diff |= x ^ y;
  }
  return diff === 0;
}

/** Read + shape the Menu sheet, with a short server-side cache. */
function readMenu_() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get("menu_json");
  if (cached) return JSON.parse(cached);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];

  // Row 0 = headers: name | category | price | image | description
  // (id is generated here from the row number; the sheet has no id/rating columns)
  var items = rows
    .slice(1)
    .filter(function (r) {
      return String(r[0] || "").trim() !== "";
    })
    .map(function (r, i) {
      return {
        id: String(i + 1),
        name: String(r[0] || "").trim(),
        category: String(r[1] || "Uncategorised").trim(),
        price: parseFloat(r[2]) || 0,
        image: String(r[3] || "").trim(),
        description: String(r[4] || "").trim(),
      };
    });

  cache.put("menu_json", JSON.stringify(items), CACHE_TTL_SECONDS);
  return items;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Run ONCE to generate and store a strong secret.
 * After running, open Executions/Logs and copy the key into your .env.
 * You do NOT need to paste a key here — a 256-bit random one is generated.
 */
function setupKey() {
  var key = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
  PropertiesService.getScriptProperties().setProperty("WEBHOOK_KEY", key);
  Logger.log("WEBHOOK_KEY stored. Copy into .env as MENU_WEBHOOK_KEY:\n" + key);
}
