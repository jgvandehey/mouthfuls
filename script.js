// Vercel function in api/waitlist.js — saves the signup to Resend and sends the confirmation email.
const WAITLIST_ENDPOINT = "/api/waitlist";

const modal = document.getElementById("modal");
let lastFocus = null;

document.getElementById("year").textContent = new Date().getFullYear();

// Modal
function openModal() {
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const input = modal.querySelector("input[type=email]");
  (input && !input.closest("[hidden]") ? input : modal.querySelector(".modal-close")).focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

document.querySelectorAll("[data-open-modal]").forEach((b) => b.addEventListener("click", openModal));
modal.querySelector("[data-close-modal]").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

// Waitlist forms (inline + modal share state)
function showJoined(email) {
  document.querySelectorAll("[data-email]").forEach((el) => (el.textContent = email));
  document.querySelectorAll("[data-not-joined]").forEach((el) => (el.hidden = true));
  document.querySelectorAll("[data-joined]").forEach((el) => (el.hidden = false));
}

document.querySelectorAll(".waitlist-form").forEach((form) => {
  const input = form.querySelector("input[type=email]");
  const button = form.querySelector("button[type=submit]");
  const error = form.querySelector(".form-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.textContent = "";
    const email = input.value.trim();

    if (!email || !input.checkValidity()) {
      error.textContent = "Please enter a valid email address.";
      input.focus();
      return;
    }
    if (form._gotcha.value) return; // bot

    button.disabled = true;
    const label = button.textContent;
    button.textContent = "Joining…";

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        body: new URLSearchParams({ email }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "signup_failed");
      showJoined(email);
    } catch (err) {
      error.textContent = "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
});
