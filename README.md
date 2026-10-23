# Mouthfuls

Static waitlist landing page for Mouthfuls. Signups are saved to a Google Sheet and each person gets a branded confirmation email. No backend or third-party form service needed.

```
index.html              page markup (hero, about, card game, waitlist, follow, popup)
styles.css              styles + tablet/phone breakpoints
script.js               popup + waitlist form submission
assets/                 images and self-hosted fonts (DynaPuff, Figtree — SIL OFL)
google-apps-script.gs   Sheet backend + confirmation email
```

## Setup

1. Deploy this folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) and note the URL.
2. Create a new Google Sheet and open **Extensions → Apps Script**. Replace the default code with `google-apps-script.gs`.
3. At the top of the script, fill in `SITE_URL` (from step 1; the email loads its images from there), `TIKTOK_URL`, `INSTAGRAM_URL`, and `CONTACT_EMAIL`. Save.
4. Optional: select `sendTestEmail` in the toolbar and click **Run** to preview the confirmation email in your inbox.
5. **Deploy → New deployment → Web app**, *Execute as* **Me**, *Who has access* **Anyone**. Deploy and authorize.
6. Copy the web app URL (ends in `/exec`) into `WAITLIST_ENDPOINT` at the top of `script.js` and redeploy the site.

Signups land in the **Waitlist** tab (created automatically) with a timestamp; duplicates are ignored.

### Confirmation emails

Sent from your Google account via `MailApp` (about 100/day on a free Gmail account, 1,500/day on Workspace). Set `SEND_CONFIRMATION = false` to turn them off. After editing the script, publish via **Deploy → Manage deployments → Edit → New version**, or the old version keeps running.

### Placeholders to replace

- Social links and contact email in the footer of `index.html`.
- The same values at the top of `google-apps-script.gs`.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
