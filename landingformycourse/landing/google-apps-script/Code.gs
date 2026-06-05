var SHEET_NAME = "Leads";
var NOTIFY_EMAIL = "georgywork0@gmail.com";

function doPost(e) {
  try {
    var data = parsePayload_(e);
    var sheet = getOrCreateSheet_();
    var submittedAt = new Date();

    sheet.appendRow([
      submittedAt,
      data.name || "",
      data.telegram || "",
      data.email || "",
      data.experience || "",
      data.goals || ""
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "Новая заявка на курс",
      htmlBody:
        "<p><strong>Новая заявка на курс</strong></p>" +
        "<p><strong>Имя:</strong> " + escapeHtml_(data.name) + "</p>" +
        "<p><strong>Телеграм:</strong> " + escapeHtml_(data.telegram) + "</p>" +
        "<p><strong>Email:</strong> " + escapeHtml_(data.email) + "</p>" +
        "<p><strong>Опыт:</strong><br>" + nl2br_(escapeHtml_(data.experience)) + "</p>" +
        "<p><strong>Что хочет от курса:</strong><br>" + nl2br_(escapeHtml_(data.goals)) + "</p>"
    });

    return jsonOutput_({
      status: "success"
    });
  } catch (error) {
    return jsonOutput_({
      status: "error",
      message: error.message
    });
  }
}

function doOptions() {
  return jsonOutput_({
    status: "ok"
  });
}

function doGet() {
  return jsonOutput_({
    status: "ok",
    message: "Lead form endpoint is running"
  });
}

function getOrCreateSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "submitted_at",
      "name",
      "telegram",
      "email",
      "experience",
      "goals"
    ]);
  }

  return sheet;
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePayload_(e) {
  if (e && e.postData && e.postData.contents) {
    var raw = e.postData.contents;

    try {
      return JSON.parse(raw);
    } catch (error) {
      return {
        name: e.parameter.name || "",
        telegram: e.parameter.telegram || "",
        email: e.parameter.email || "",
        experience: e.parameter.experience || "",
        goals: e.parameter.goals || ""
      };
    }
  }

  return {
    name: "",
    telegram: "",
    email: "",
    experience: "",
    goals: ""
  };
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br_(value) {
  return String(value || "").replace(/\n/g, "<br>");
}
