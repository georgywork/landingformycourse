// Lead form submission to Google Apps Script web app.
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("lead-form");
  var status = document.getElementById("form-status");
  var endpoint = "https://script.google.com/macros/s/AKfycbwiuT1DcdnLlXYaT9jP1eOOCGJ4JXi77zc6Sn67cZIHzRkPGks-ifvGUHO0kwUPR8pp/exec";

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    if (endpoint === "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
      status.textContent = "Нужно вставить URL Google Apps Script в js/form.js.";
      status.className = "form-status is-error";
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    var formData = new FormData(form);
    var payload = new URLSearchParams();

    payload.append("name", formData.get("name"));
    payload.append("telegram", formData.get("telegram"));
    payload.append("email", formData.get("email"));
    payload.append("experience", formData.get("experience"));
    payload.append("goals", formData.get("goals"));

    submitButton.disabled = true;
    status.textContent = "Отправляем заявку...";
    status.className = "form-status";

    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      body: payload
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then(function (data) {
        if (!data || (data.status !== "success" && data.status !== "ok")) {
          throw new Error("Submission failed");
        }

        form.reset();
        status.textContent = "Заявка отправлена. Георгий напишет тебе с деталями.";
        status.className = "form-status is-success";
      })
      .catch(function () {
        status.textContent = "Не удалось отправить заявку. Попробуй ещё раз чуть позже.";
        status.className = "form-status is-error";
      })
      .finally(function () {
        submitButton.disabled = false;
      });
  });
});
