// Set this to your Google Apps Script web app URL (see google-apps-script.gs and README).
const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

const form = document.getElementById("waitlist");
const statusEl = document.getElementById("status");
const button = form.querySelector("button");

document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = "status" + (kind ? " " + kind : "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();

  if (!form.email.checkValidity() || !email) {
    setStatus("Please enter a valid email address.", "err");
    return;
  }
  if (form._gotcha.value) return; // bot

  button.disabled = true;
  setStatus("Adding you to the list…");

  try {
    // Form-encoded body keeps this a "simple" CORS request, which Apps Script requires.
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      body: new URLSearchParams({ email }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "signup_failed");
    form.reset();
    setStatus("You're on the list! We'll be in touch soon.", "ok");
  } catch (err) {
    setStatus("Something went wrong. Please try again.", "err");
  } finally {
    button.disabled = false;
  }
});
