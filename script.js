// Set this to your form endpoint (e.g. a Formspree form: https://formspree.io/f/xxxxxxx).
// Any endpoint that accepts a JSON POST of { email } works.
const WAITLIST_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    setStatus("You're on the list! We'll be in touch soon.", "ok");
  } catch (err) {
    setStatus("Something went wrong. Please try again.", "err");
  } finally {
    button.disabled = false;
  }
});
